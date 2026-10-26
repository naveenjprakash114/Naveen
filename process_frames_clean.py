import os
import glob
from PIL import Image
from rembg import remove, new_session

def main():
    frames_dir = 'public/frames'
    files = sorted(glob.glob(f'{frames_dir}/ezgif-frame-*.jpg'))
    print(f'Found {len(files)} source ezgif frames in {frames_dir}')
    
    if not files:
        print('No ezgif-frame-*.jpg files found!')
        return

    session = new_session('u2net')
    
    for i in range(1, 51):
        if i <= len(files):
            fpath = files[i - 1]
        else:
            fpath = files[-1]
            
        out_webp = f'{frames_dir}/frame_{i:03d}.webp'
        out_jpg = f'{frames_dir}/frame_{i:03d}.jpg'
        
        print(f'[{i}/50] Processing AI background removal for {os.path.basename(fpath)}...')
        img = Image.open(fpath).convert('RGB')
        
        # AI Background removal for pristine transparency
        out_img = remove(img, session=session)
        out_img.save(out_webp, 'WEBP', quality=95)
        
        # Save crisp JPG fallback
        img.save(out_jpg, 'JPEG', quality=92)

    print('SUCCESS: All 50 transparent WebP and JPG fallback frames generated in public/frames!')

if __name__ == '__main__':
    main()
