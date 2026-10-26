import os
import glob
from PIL import Image
from rembg import remove, new_session

def main():
    src_dir = '/Users/macbook/Downloads/ezgif-794a3e20726b320d-jpg'
    out_dir = 'public/frames'
    os.makedirs(out_dir, exist_ok=True)

    files = sorted(glob.glob(f'{src_dir}/ezgif-frame-*.jpg'))
    print(f'Found {len(files)} frame files in {src_dir}')

    # Create rembg session (u2net model)
    session = new_session('u2net')

    for i, fpath in enumerate(files, 1):
        print(f'Processing AI background removal frame {i}/{len(files)}: {os.path.basename(fpath)}...')
        img = Image.open(fpath)
        
        # AI background removal
        out = remove(img, session=session)
        
        # Save as transparent WebP (high quality & lightweight)
        out_webp = f'{out_dir}/frame_{i:03d}.webp'
        out.save(out_webp, 'WEBP', quality=92)

    print('All 50 frames processed with AI background removal!')

if __name__ == '__main__':
    main()
