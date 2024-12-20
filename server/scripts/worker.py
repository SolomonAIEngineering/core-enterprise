#!/usr/bin/env python3
import os
import subprocess
from pathlib import Path


def main():
    # Ensure we're in the server directory
    server_dir = Path(__file__).parent.parent
    os.chdir(server_dir)

    # Start the worker
    subprocess.run(["uv", "run", "task", "worker"])


if __name__ == "__main__":
    main()
