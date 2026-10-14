import sys
# Strip Vercel's legacy cached packages from sys.path to prevent numpy dependency conflicts
sys.path = [p for p in sys.path if ".vercel_python_packages" not in p]

import pandas as pd
import json
import os

# Published Google Sheets CSV link
SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfCADNaqCMcaESgrna8M0VwWc7WTQDUSFGLVqbKOzllPErGMacpR5pUM27sB4sEzw0HDd2IUSOh7y_/pub?output=csv"
output_file = "./src/data/blogsData.js"

print("Fetching latest blog data from Google Sheets...")

try:
    # Read live data directly from the URL
    df = pd.read_csv(SHEET_CSV_URL)
except Exception as e:
    print(f"Error fetching data from Google Sheets: {e}")
    exit(1)

blogs = []

for index, row in df.iterrows():
    required_fields = [
        'id', 'slug', 'title', 'metaTitle', 'metaDescription', 'date',
        'image', 'category', 'subcategory', 'content'
    ]
    if any(
        field not in row or pd.isna(row[field]) or not str(row[field]).strip()
        for field in required_fields
    ):
        continue

    # Handle subcategories
    subcat_raw = str(row['subcategory']).strip() if pd.notna(row['subcategory']) else "Other"
    if ',' in subcat_raw:
        subcategories = [s.strip() for s in subcat_raw.split(',')]
    else:
        subcategories = subcat_raw

    # Handle image paths
    image_path = str(row['image']).strip() if pd.notna(row['image']) else "assets/bg.jpg"
    if image_path.startswith('/'):
        image_path = image_path[1:]

    # Handle formatted date strings
    raw_date = row['date']
    if pd.notna(raw_date):
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

    # Parse blog object properties
    blog_obj = {
        "id": int(row['id']) if pd.notna(row['id']) and str(row['id']).strip().isdigit() else index + 1,
        "slug": str(row['slug']).strip() if pd.notna(row['slug']) else "",
        "title": str(row['title']).strip() if pd.notna(row['title']) else "",
        "metaTitle": str(row['metaTitle']).strip() if pd.notna(row['metaTitle']) else "",
        "metaDescription": str(row['metaDescription']).strip() if pd.notna(row['metaDescription']) else "",
        "date": formatted_date,
        "image": f"/{image_path}",
        "category": str(row['category']).strip() if pd.notna(row['category']) else "",
        "subcategory": subcategories,
        "content": str(row['content']).strip() if pd.notna(row['content']) else ""
    }
    blogs.append(blog_obj)

# Sort so newest ID appears at the top (descending order)
blogs.sort(key=lambda x: x['id'], reverse=True)

# Format output as ES Module export
json_string = json.dumps(blogs, indent=2, ensure_ascii=False)
file_content = f"export const blogs = {json_string};\n"

# Save data file
os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, "w", encoding="utf-8") as f:
    f.write(file_content)

print(f"Successfully synced {len(blogs)} blogs from Google Sheets to {output_file}!")