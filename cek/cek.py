import sys
from pathlib import Path
import tree_sitter_python as tspython
from tree_sitter import Language, Parser, Query, QueryCursor

PY = Language(tspython.language())
parser = Parser(PY)

Q_TODO = Query(PY, '((comment) @c (#match? @c "TODO|FIXME"))')
Q_FUNCTION = Query(PY, '(function_definition name: (identifier) @nama) @fungsi')

def cari_masalah_sintaks(node):
    if node.is_error or node.is_missing:
        return node
    for child in node.children:
        masalah = cari_masalah_sintaks(child)
        if masalah:
            return masalah
    return None

def cek_file(path):
    tree = parser.parse(path.read_bytes())

    for node in QueryCursor(Q_TODO).captures(tree.root_node).get("c", []):
        print(f"{path}:{node.start_point[0] + 1}: {node.text.decode().strip()}")

    for _, captures in QueryCursor(Q_FUNCTION).matches(tree.root_node):
        fungsi = captures["fungsi"][0]
        nama = captures["nama"][0].text.decode()
        jumlah_baris = fungsi.end_point[0] - fungsi.start_point[0] + 1
        if jumlah_baris > 30:
            print(
                f"{path}:{fungsi.start_point[0] + 1}: "
                f"fungsi {nama} memiliki {jumlah_baris} baris"
            )

    if tree.root_node.has_error:
        masalah = cari_masalah_sintaks(tree.root_node)
        if masalah:
            jenis = f"MISSING {masalah.type}" if masalah.is_missing else "ERROR"
            print(f"{path}:{masalah.start_point[0] + 1}: syntax {jenis}")

for path in Path(sys.argv[1]).rglob("*.py"):
    cek_file(path)
