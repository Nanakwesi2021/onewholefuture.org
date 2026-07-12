import os
from PIL import Image

def optimize_image(filepath):
    filename, ext = os.path.splitext(filepath)
    ext = ext.lower()
    
    if ext not in ['.jpg', '.jpeg', '.png']:
        return
        
    try:
        with Image.open(filepath) as img:
            # Convert RGBA/P to RGB if converting to WebP (unless transparency is needed)
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                pass
            else:
                img = img.convert('RGB')
                
            # Resize if too large (max width 1920px for web display)
            max_width = 1920
            if img.width > max_width:
                w_percent = (max_width / float(img.width))
                h_size = int((float(img.height) * float(w_percent)))
                img = img.resize((max_width, h_size), Image.Resampling.LANCZOS)
                print(f"Resized {os.path.basename(filepath)} to {max_width}x{h_size}")
                
            webp_path = filename + '.webp'
            img.save(webp_path, 'WEBP', quality=75)
            
            orig_size = os.path.getsize(filepath)
            new_size = os.path.getsize(webp_path)
            reduction = (orig_size - new_size) / orig_size * 100
            print(f"Optimized: {os.path.basename(filepath)} -> {os.path.basename(webp_path)} ({orig_size/1024:.1f}KB -> {new_size/1024:.1f}KB, -{reduction:.1f}%)")
            
            # Remove original if WebP is generated and successful
            if os.path.exists(webp_path) and new_size > 0:
                os.remove(filepath)
                print(f"Removed original: {os.path.basename(filepath)}")
    except Exception as e:
        print(f"Failed to optimize {filepath}: {e}")

def run_optimizer():
    dirs = [
        '/Users/barnabaseshun/Downloads/onewholefuture.org-main/public/image',
        '/Users/barnabaseshun/Downloads/onewholefuture.org-main/public/images'
    ]
    for d in dirs:
        if os.path.exists(d):
            print(f"Scanning directory: {d}")
            for root, _, files in os.walk(d):
                for file in files:
                    filepath = os.path.join(root, file)
                    optimize_image(filepath)

if __name__ == '__main__':
    run_optimizer()
