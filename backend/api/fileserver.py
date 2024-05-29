from flask import Blueprint, Flask, send_from_directory
from flask import current_app

fileserver = Blueprint("fileserver", __name__)


@fileserver.route("/<path:filename>")
def serve_file(filename):
    return send_from_directory(current_app.config["UPLOAD_FOLDER"], filename)
