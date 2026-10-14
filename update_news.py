import sys
# Strip Vercel's legacy cached packages from sys.path to prevent numpy dependency conflicts
sys.path = [p for p in sys.path if ".vercel_python_packages" not in p]

import pandas as pd
import json
import os

NEWS_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfCADNaqCMcaESgrna8M0VwWc7WTQDUSFGLVqbKOzllPErGMacpR5pUM27sB4sEzw0HDd2IUSOh7y_/pub?gid=1981143694&single=true&output=csv"
output_file = "./src/data/newsData.js"

print("Fetching latest news data from Google Sheets...")

try:
    df = pd.read_csv(
        NEWS_SHEET_CSV_URL, 
        on_bad_lines='skip', 
        engine='python'
    )
except Exception as e:
    print(f"Error fetching data from Google Sheets: {e}")
    exit(1)

news_items = []

for index, row in df.iterrows():
    # Skip completely empty rows
    if pd.isna(row.get('slug')) and pd.isna(row.get('title')):
        continue

    # Handle subcategories
    subcat_raw = str(row.get('subcategory', '')).strip() if pd.notna(row.get('subcategory')) else "Other"
    if ',' in subcat_raw:
        subcategories = [s.strip() for s in subcat_raw.split(',')]
    else:
        subcategories = subcat_raw

    # Handle image paths
    image_path = str(row.get('image', '')).strip() if pd.notna(row.get('image')) else "assets/bg.jpg"
    if image_path.startswith('/'):
        image_path = image_path[1:]

    # Handle formatted date strings
    raw_date = row.get('date', '')
    if pd.notna(raw_date) and str(raw_date).strip() != "":
        try:
            parsed_date = pd.to_datetime(raw_date, errors='coerce')
            if pd.notna(parsed_date):
                formatted_date = parsed_date.strftime('%B %d, %Y')
            else:
                formatted_date = str(raw_date).strip()
        except Exception:
            formatted_date = str(raw_date).strip()
    else:
        formatted_date = ""

    # Parse news object properties safely
    required_fields = [
        'id', 'slug', 'title', 'metaTitle', 'metaDescription',
        'date', 'image', 'category', 'subcategory', 'content'
    ]
    if any(
        field not in row or pd.isna(row[field]) or str(row[field]).strip() == ""
        for field in required_fields
    ) or not str(row['id']).strip().isdigit():
        print(f"Skipping row {index + 1}: one or more required fields are blank or invalid.")
        continue

    news_obj = {
        "id": int(row['id']) if 'id' in row and pd.notna(row['id']) and str(row['id']).strip().isdigit() else index + 1,
        "slug": str(row.get('slug', '')).strip() if pd.notna(row.get('slug')) else "",
        "title": str(row.get('title', '')).strip() if pd.notna(row.get('title')) else "",
        "metaTitle": str(row.get('metaTitle', '')).strip() if pd.notna(row.get('metaTitle')) else "",
        "metaDescription": str(row.get('metaDescription', '')).strip() if pd.notna(row.get('metaDescription')) else "",
        "date": formatted_date,
        "image": f"/{image_path}",
        "category": str(row.get('category', '')).strip() if pd.notna(row.get('category')) else "",
        "subcategory": subcategories,
        "content": str(row.get('content', '')).strip() if pd.notna(row.get('content')) else ""
    }
    news_items.append(news_obj)

# Sort so newest ID appears at the top (descending order)
news_items.sort(key=lambda x: x['id'], reverse=True)

# Format output as ES Module export (using blogs to match your import setup)
json_string = json.dumps(news_items, indent=2, ensure_ascii=False)
file_content = f"export const blogs = {json_string};\n"

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, "w", encoding="utf-8") as f:
    f.write(file_content)

print(f"Successfully synced {len(news_items)} news items from Google Sheets to {output_file}!")