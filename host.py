import http.server
import socketserver
import os

PORT = 8000
DIRECTORY = "./"  # Replace with the actual path

os.chdir(DIRECTORY)  # Change into the website directory

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    httpd.serve_forever()
