from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import textwrap


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "component_diagram_hedgehogcrm_connected.png"

W, H = 3000, 2050
BG = "white"
LINE = (35, 35, 35)
BOX = (25, 25, 25)
TEXT = (15, 15, 15)
DB_FILL = (86, 103, 118)


def load_font(size):
    for p in (r"C:\Windows\Fonts\times.ttf", r"C:\Windows\Fonts\arial.ttf"):
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()


FONT_NODE = load_font(25)
FONT_LABEL = load_font(24)

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)


def wrap_path(path, width=30):
    parts = path.replace("\\", "/").split("/")
    lines = []
    current = ""
    for part in parts:
        piece = part if not current else "/" + part
        if len(current) + len(piece) <= width:
            current += piece
            continue
        if current:
            lines.append(current)
        if len(part) > width:
            lines.extend(textwrap.wrap(part, width))
            current = ""
        else:
            current = part
    if current:
        lines.append(current)
    return lines


BW, BH = 370, 96
nodes = {}


def add(key, x, y, label):
    nodes[key] = {"rect": (x, y, BW, BH), "label": label}


def left(key):
    x, y, w, h = nodes[key]["rect"]
    return x, y + h // 2


def right(key):
    x, y, w, h = nodes[key]["rect"]
    return x + w, y + h // 2


def top(key):
    x, y, w, h = nodes[key]["rect"]
    return x + w // 2, y


def bottom(key):
    x, y, w, h = nodes[key]["rect"]
    return x + w // 2, y + h


def center(key):
    x, y, w, h = nodes[key]["rect"]
    return x + w // 2, y + h // 2


def draw_line(points, width=4):
    d.line(points, fill=LINE, width=width)


def draw_joint(x, y, r=5):
    d.ellipse([x - r, y - r, x + r, y + r], fill=LINE, outline=LINE)


def draw_label(text, x, y):
    d.text((x, y), text, font=FONT_LABEL, fill=(70, 70, 70))


def fill_box(key):
    x, y, w, h = nodes[key]["rect"]
    d.rectangle([x, y, x + w, y + h], fill=BG)


def draw_box(key):
    x, y, w, h = nodes[key]["rect"]
    label = nodes[key]["label"]
    d.rectangle([x, y, x + w, y + h], outline=BOX, width=3)
    lines = wrap_path(label)
    line_h = 28
    yy = y + (h - len(lines) * line_h) / 2 - 1
    for line in lines:
        bb = d.textbbox((0, 0), line, font=FONT_NODE)
        d.text((x + (w - (bb[2] - bb[0])) / 2, yy), line, font=FONT_NODE, fill=TEXT)
        yy += line_h


def draw_database(cx, cy):
    rx, ry = 78, 26
    top_y = cy - 72
    mid_y = cy
    bottom_y = cy + 72
    side_left = cx - rx
    side_right = cx + rx
    top_arc = [side_left, top_y, side_right, top_y + 2 * ry]
    mid_arc = [side_left, mid_y - ry, side_right, mid_y + ry]
    bottom_arc = [side_left, bottom_y - 2 * ry, side_right, bottom_y]

    # Main body.
    d.rectangle([side_left, top_y + ry, side_right, bottom_y - ry], fill=DB_FILL)
    d.ellipse(top_arc, outline=BOX, fill=(96, 115, 132), width=3)
    d.rectangle([side_left, top_y + ry, side_right, bottom_y - ry], outline=BOX, width=3)
    d.ellipse(bottom_arc, outline=BOX, fill=(74, 90, 105), width=3)

    # Inner rounded separators make the database symbol readable but still clean.
    d.arc(mid_arc, 0, 180, fill=(235, 235, 235), width=3)
    d.arc(bottom_arc, 0, 180, fill=(235, 235, 235), width=3)
    d.line([(side_left, top_y + ry), (side_left, bottom_y - ry)], fill=BOX, width=3)
    d.line([(side_right, top_y + ry), (side_right, bottom_y - ry)], fill=BOX, width=3)

    bb = d.textbbox((0, 0), "БД", font=FONT_LABEL)
    d.text((cx - (bb[2] - bb[0]) / 2, bottom_y + 20), "БД", font=FONT_LABEL, fill=TEXT)


# Component nodes.
add("main", 310, 70, "backend/app/main.py")
add("router", 800, 70, "backend/app/api/router.py")
add("login", 1630, 38, "frontend/src/app/(auth)/login/page.tsx")
add("reg", 1630, 174, "frontend/src/app/(auth)/registration/page.tsx")
add("account", 1630, 310, "frontend/src/app/(dashboard)/account/page.tsx")
add("dashboard", 1160, 335, "frontend/src/app/(dashboard)/page.tsx")

add("activity", 320, 640, "frontend/src/app/(dashboard)/admin/activity/page.tsx")
add("analytics", 320, 800, "frontend/src/app/(dashboard)/analytics/page.tsx")
add("staff", 320, 960, "frontend/src/app/(dashboard)/staff/page.tsx")
add("staff_id", 800, 960, "frontend/src/app/(dashboard)/staff/[userId]/page.tsx")
add("archive", 320, 1120, "frontend/src/app/(dashboard)/archive/page.tsx")
add("archive_id", 800, 1120, "frontend/src/app/(dashboard)/archive/[entity]/[entityId]/page.tsx")
add("settings", 320, 1280, "frontend/src/app/(dashboard)/settings/page.tsx")

add("clients", 1700, 640, "frontend/src/app/(dashboard)/clients/page.tsx")
add("client_id", 2180, 640, "frontend/src/app/(dashboard)/clients/[clientId]/page.tsx")
add("calendar", 1700, 820, "frontend/src/app/(dashboard)/calendar/page.tsx")
add("cal_new", 2180, 780, "frontend/src/app/(dashboard)/calendar/new/page.tsx")
add("cal_edit", 2180, 920, "frontend/src/app/(dashboard)/calendar/[lessonId]/edit/page.tsx")
add("makeups", 1700, 1040, "frontend/src/app/(dashboard)/makeups/page.tsx")
add("deals", 1700, 1200, "frontend/src/app/(dashboard)/deals/page.tsx")
add("tasks", 1700, 1360, "frontend/src/app/(dashboard)/tasks/page.tsx")
add("messages", 1700, 1520, "frontend/src/app/(dashboard)/messages/[box]/page.tsx")

add("my_students", 1110, 1760, "frontend/src/app/(dashboard)/my-students/page.tsx")
add("my_students_edit", 1590, 1760, "frontend/src/app/(dashboard)/my-students/[clientId]/edit/page.tsx")


# Draw objects first. Connector lines are drawn after them with endpoints on the
# rectangle borders, so the resulting PNG has no visible gaps at connections.
draw_database(130, 235)
for key in nodes:
    draw_box(key)

# Top-level application flow without dangling bus lines.
# БД -> main.py -> router.py, then router.py branches to common pages and dashboard.
main_lx, main_ly = left("main")
main_rx, main_ry = right("main")
router_lx, router_ly = left("router")
router_rx, router_ry = right("router")
draw_line([(202, 235), (260, 235), (260, main_ly), (main_lx, main_ly)])
draw_line([(main_rx, main_ry), (router_lx, router_ly)])

COMMON_X = 1570
login_y = center("login")[1]
account_y = center("account")[1]
draw_line([(COMMON_X, login_y), (COMMON_X, account_y)])
draw_line([(router_rx, router_ry), (COMMON_X, router_ry)])
for key in ("login", "reg", "account"):
    lx, ly = left(key)
    # Small overlap with the rectangle border prevents antialiasing gaps.
    draw_line([(COMMON_X, ly), (lx + 3, ly)])
    draw_joint(COMMON_X, ly)

router_bottom_x, router_bottom_y = bottom("router")
dashboard_top_x, dashboard_top_y = top("dashboard")
ROUTE_Y = 270
draw_line([
    (router_bottom_x, router_bottom_y),
    (router_bottom_x, ROUTE_Y),
    (dashboard_top_x, ROUTE_Y),
    (dashboard_top_x, dashboard_top_y),
])

# Main dashboard trunk.
TRUNK_X, TRUNK_TOP = bottom("dashboard")
TRUNK_BOTTOM = top("my_students")[1]
draw_line([(TRUNK_X, TRUNK_TOP), (TRUNK_X, TRUNK_BOTTOM)])

# Administrator branch.
ADMIN_X = 220
ADMIN_TOP = 585
ADMIN_BOTTOM = center("settings")[1]
draw_line([(TRUNK_X, ADMIN_TOP), (ADMIN_X, ADMIN_TOP), (ADMIN_X, ADMIN_BOTTOM)])
for key in ("activity", "analytics", "staff", "archive", "settings"):
    lx, ly = left(key)
    draw_line([(ADMIN_X, ly), (lx, ly)])
draw_line([right("staff"), left("staff_id")])
draw_line([right("archive"), left("archive_id")])

# Manager branch.
MANAGER_X = 1600
MANAGER_TOP = 585
MANAGER_BOTTOM = center("messages")[1]
draw_line([(TRUNK_X, MANAGER_TOP), (MANAGER_X, MANAGER_TOP), (MANAGER_X, MANAGER_BOTTOM)])
for key in ("clients", "calendar", "makeups", "deals", "tasks", "messages"):
    lx, ly = left(key)
    draw_line([(MANAGER_X, ly), (lx, ly)])
draw_line([right("clients"), left("client_id")])

cal_rx, cal_ry = right("calendar")
split_x = 2130
new_lx, new_ly = left("cal_new")
edit_lx, edit_ly = left("cal_edit")
draw_line([(cal_rx, cal_ry), (split_x, cal_ry), (split_x, new_ly), (new_lx, new_ly)])
draw_line([(split_x, cal_ry), (split_x, edit_ly), (edit_lx, edit_ly)])

# Teacher branch.
student_top_x, student_top_y = top("my_students")
draw_line([(TRUNK_X, TRUNK_BOTTOM), (student_top_x, student_top_y)])
draw_line([right("my_students"), left("my_students_edit")])

# Draw labels last.
draw_label("Со стороны администратора", 320, 585)
draw_label("Со стороны менеджера", 1700, 585)
draw_label("Со стороны преподавателя", 1110, 1695)

OUT.parent.mkdir(exist_ok=True)
img.save(OUT)
print(OUT)
