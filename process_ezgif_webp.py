import os
from PIL import Image, ImageSequence
from rembg import remove, new_session
import time

def process():
    webp_path = 'public/frames/ezgif.com-webp-maker.webp'
    out_dir = 'public/frames'
    os.makedirs(out_dir, exist_ok=True)

    print(f"Opening WebP animation: {webp_path}")
    img = Image.open(webp_path)

    frames = []
    for frame in ImageSequence.Iterator(img):
        frames.append(frame.copy().convert('RGBA'))

    num_frames = len(frames)
    print(f"Total frames extracted: {num_frames}, size: {frames[0].size}")

    session = new_session('u2net')
    start_time = time.time()

    transparent_frames = []
    for i, frame in enumerate(frames, 1):
        t0 = time.time()
        # Remove background
        out = remove(frame, session=session)
        
        # Save transparent webp frame
        out_path = f"{out_dir}/frame_{i:03d}.webp"
        out.save(out_path, 'WEBP', quality=95, lossless=False)

        # Also save ezgif frame naming fallback for compatibility
        out_ezgif = f"{out_dir}/ezgif-frame-{i:03d}.jpg"
        # Convert RGBA to RGB with white background for JPG fallback
        bg = Image.new('RGB', out.size, (255, 255, 255))
        bg.paste(out, mask=out.split()[3])
        bg.save(out_ezgif, 'JPEG', quality=90)

        transparent_frames.append(out)
        dt = time.time() - t0
        print(f"[{i}/{num_frames}] Processed & background removed frame_{i:03d}.webp in {dt:.2f}s")

    print(f"All {num_frames} frames processed with background removal in {time.time() - start_time:.2f}s!")

    # Also save the combined transparent animated WebP
    transparent_anim_path = 'public/frames/ezgif.com-webp-maker-transparent.webp'
    transparent_frames[0].save(
        transparent_anim_path,
        save_all=True,
        append_images=transparent_frames[1:],
        duration=img.info.get('duration', 40),
        loop=0,
        disposal=2
    )
    print(f"Saved full transparent animated WebP to {transparent_anim_path}")

if __name__ == '__main__':
    process()
