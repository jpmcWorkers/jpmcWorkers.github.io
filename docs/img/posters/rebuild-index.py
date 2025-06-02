import html, os

def entry(filename):
	return '<img src="%s" />\n\n'%html.escape(filename, True)

def is_image(filename):
	base, ext = os.path.splitext(filename)
	return ext.lower() in (".png", ".jpg", ".jpeg")

schedule = sorted(filter(is_image, os.listdir(".")), key=str.lower)
body = "".join(map(entry, schedule))

with open("index.md", "w") as fh:
	fh.write("# Poster Gallery\n\n")
	fh.write(body)

print(len(schedule), "posters organized.")
