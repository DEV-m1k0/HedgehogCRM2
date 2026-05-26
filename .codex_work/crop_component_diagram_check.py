from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
img = Image.open(ROOT / "component_diagram_hedgehogcrm_clean.png")

# Crop the bottom part of the messages component to verify there are no internal waves.
# Coordinates match the generated diagram layout.
crop = img.crop((1690, 1510, 2085, 1635))
out = ROOT / ".codex_work" / "component_diagram_clean_crop_check.png"
crop.save(out)
print(out)
