import pandas as pd
import numpy as np
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

# Load and preprocess dataset
file_path = r'C:\Users\manan\Documents\Outfit\Fashionset_final.csv'
df = pd.read_csv(file_path)

def preprocess(df):
    # Text input: occasion
    occ_vectorizer = tf.keras.layers.TextVectorization(max_tokens=100, output_mode='int', output_sequence_length=5)
    occ_vectorizer.adapt(df['occasion'].astype(str))
    occ_input = occ_vectorizer(df['occasion'].astype(str))  # shape (n, seq_len)

    # Numeric inputs: price and ratingCount
    num_feats = df[['price', 'ratingCount']].fillna(0).values
    scaler = StandardScaler()
    num_input = scaler.fit_transform(num_feats)

    # Labels: avg_rating
    labels = df['avg_rating'].fillna(0).values

    return occ_input, num_input, labels, occ_vectorizer, scaler

# Prepare data
ooc, num, y, occ_vectorizer, scaler = preprocess(df)
X_occ_train, X_occ_test, X_num_train, X_num_test, y_train, y_test = train_test_split(
    ooc, num, y, test_size=0.2, random_state=42
)

# Build model
# Text branch: CNN on occasion
input_occ = tf.keras.Input(shape=(X_occ_train.shape[1],), dtype='int32', name='occasion')
embed = tf.keras.layers.Embedding(input_dim=100, output_dim=16)(input_occ)
conv = tf.keras.layers.Conv1D(filters=32, kernel_size=3, activation='relu')(embed)
pool = tf.keras.layers.GlobalMaxPooling1D()(conv)

# Numeric branch
e_input = tf.keras.Input(shape=(X_num_train.shape[1],), dtype='float32', name='numeric')
dense_num = tf.keras.layers.Dense(16, activation='relu')(e_input)

# Combine
concat = tf.keras.layers.concatenate([pool, dense_num])
dense1 = tf.keras.layers.Dense(32, activation='relu')(concat)
output = tf.keras.layers.Dense(1, activation='linear')(dense1)

model = tf.keras.Model(inputs=[input_occ, e_input], outputs=output)
model.compile(optimizer='adam', loss='mse', metrics=['mae'])

# Train
epochs = 50
history = model.fit(
    {'occasion': X_occ_train, 'numeric': X_num_train}, y_train,
    validation_data=({'occasion': X_occ_test, 'numeric': X_num_test}, y_test),
    epochs=epochs,
    batch_size=32
)

# Save the trained model and preprocessors
model.save('outfit_recommender_model')
import pickle
with open('occ_vectorizer.pkl', 'wb') as f:
    pickle.dump(occ_vectorizer, f)
with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

print('Model training complete and saved.')