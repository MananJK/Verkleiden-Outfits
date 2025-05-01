import pandas as pd
import re


def load_dataset(file_path):
    try:
        df = pd.read_csv(file_path)
        print("Dataset loaded successfully!")
        return df
    except Exception as e:
        print("Error loading dataset:", e)
        exit()


def get_user_choice():
    print("What type of outfit are you looking for?")
    print("Options: Formal, Party, Casual, Wedding, Traditional, etc.")
    user_choice = input("Enter your choice: ").strip().lower()
    return user_choice


def filter_by_occasion(df, user_choice):
    # Ensure the 'occasion' column exists
    if 'occasion' not in df.columns:
        print("Error: 'occasion' column not found in dataset!")
        print("Available columns:", df.columns.tolist())
        return None
    # Normalize occasion strings
    occ_norm = df['occasion'].astype(str).str.lower()
    # Match exact word using regex word boundaries
    pattern = rf"\b{re.escape(user_choice)}\b"
    mask = occ_norm.str.contains(pattern, na=False)
    filtered = df[mask]
    if filtered.empty:
        print(f"Sorry, no products found for the occasion '{user_choice}' (pattern: {pattern})")
        return None
    return filtered


def sort_products(df):
    # Sort by price (ascending), ratingCount (descending), and avg_rating (descending)
    sorted_df = df.sort_values(by=['price', 'ratingCount', 'avg_rating'],
                               ascending=[True, False, False])
    return sorted_df


def display_outfit_recommendations(upperwear_df, bottomwear_df):
    n = min(5, len(upperwear_df), len(bottomwear_df))
    if n == 0:
        print("Not enough products to form an outfit recommendation.")
        return

    print("\nRecommended Outfits:")
    for i in range(n):
        upper = upperwear_df.iloc[i]
        bottom = bottomwear_df.iloc[i]
        print(f"\nOutfit {i + 1}:")
        print(
            f"Upperwear : {upper['name']}\n"
            f"Price: ₹{round(float(upper['price']), 2)}\n"
            f"Rating: {round(float(upper['avg_rating']), 2)}⭐\n"
            f"({int(upper['ratingCount']) if pd.notna(upper['ratingCount']) else 0} reviews)")
        print(
            f"Bottomwear: {bottom['name']}\n"
            f"Price: ₹{round(float(bottom['price']), 2)}\n "
            f"Rating: {round(float(bottom['avg_rating']), 2)}⭐\n"
            f"({int(bottom['ratingCount']) if pd.notna(bottom['ratingCount']) else 0} reviews)")
        print("-" * 50)


def main():
    # Path to the updated dataset that includes 'name', 'occasion', 'wear_type', etc.
    file_path = r"C:\Users\manan\Downloads\fashionset_final1.csv"
    df = load_dataset(file_path)

    user_choice = get_user_choice()
    filtered_df = filter_by_occasion(df, user_choice)
    if filtered_df is None:
        return

    # Split into upperwear and bottomwear groups
    upperwear_df = filtered_df[filtered_df['wear_type'] == 'upperwear']
    bottomwear_df = filtered_df[filtered_df['wear_type'] == 'bottomwear']

    if upperwear_df.empty or bottomwear_df.empty:
        print("Insufficient products for upperwear or bottomwear recommendations for this occasion.")
        return

    # Sort each group
    upperwear_df = sort_products(upperwear_df)
    bottomwear_df = sort_products(bottomwear_df)

    # Display paired outfit recommendations
    display_outfit_recommendations(upperwear_df, bottomwear_df)


if __name__ == "__main__":
    main()
