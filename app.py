from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)  # Enable cross-origin requests

# Import the recommendation functions from your outfit script
from outfits import load_dataset, filter_by_occasion, sort_products

# Pre-load the dataset
file_path = r'C:\Users\manan\Documents\Outfit\Fashionset_final.csv'
df = load_dataset(file_path)

@app.route('/api/recommendations', methods=['POST'])
def get_recommendations():
    data = request.json
    occasion = data.get('occasion', '').lower()
    
    # Apply the filtering logic
    filtered_df = filter_by_occasion(df, occasion)
    
    if filtered_df is None:
        return jsonify({
            'success': False,
            'message': f"No outfits found for occasion: {occasion}"
        })
    
    # Split into upperwear and bottomwear groups
    upperwear_df = filtered_df[filtered_df['wear_type'] == 'upperwear']
    bottomwear_df = filtered_df[filtered_df['wear_type'] == 'bottomwear']
    
    if upperwear_df.empty or bottomwear_df.empty:
        return jsonify({
            'success': False,
            'message': "Insufficient products for this occasion"
        })
    
    # Sort each group
    upperwear_df = sort_products(upperwear_df)
    bottomwear_df = sort_products(bottomwear_df)
    
    # Get top 5 recommendations
    n = min(5, len(upperwear_df), len(bottomwear_df))
    
    # Prepare response
    outfits = []
    for i in range(n):
        upper = upperwear_df.iloc[i]
        bottom = bottomwear_df.iloc[i]
        
        outfits.append({
            'upperwear': {
                'name': upper['name'],
                'price': float(upper['price']) if pd.notna(upper['price']) else 0.0,
                'avg_rating': float(upper['avg_rating']) if pd.notna(upper['avg_rating']) else 0.0,
                'ratingCount': int(upper['ratingCount']) if pd.notna(upper['ratingCount']) else 0
            },
            'bottomwear': {
                'name': bottom['name'],
                'price': float(bottom['price']) if pd.notna(bottom['price']) else 0.0,
                'avg_rating': float(bottom['avg_rating']) if pd.notna(bottom['avg_rating']) else 0.0,
                'ratingCount': int(bottom['ratingCount']) if pd.notna(bottom['ratingCount']) else 0
            }
        })
    
    return jsonify({
        'success': True,
        'outfits': outfits
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)