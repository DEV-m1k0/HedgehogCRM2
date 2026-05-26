from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
img = Image.open(ROOT / "component_diagram_hedgehogcrm_clean.png")
out_dir = ROOT / ".codex_work"
checks = {
    "top_common": (720, 20, 1900, 440),
    "admin_staff": (250, 920, 1240, 1085),
    "manager_calendar": (1560, 760, 2620, 1040),
    "teacher": (1020, 1680, 2050, 1900),
}
for name, box in checks.items():
    out = out_dir / f"component_diagram_check_{name}.png"
    img.crop(box).save(out)
    print(out)
