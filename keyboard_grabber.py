#!/usr/bin/env python3
from Xlib import X, XK, display
import subprocess
import time
import os
import signal

# Get the path of this script
script_dir = os.path.dirname(os.path.abspath(__file__))
index_path = os.path.join(script_dir, 'index.cjs')

d = display.Display()
root = d.screen().root

# Grab the keyboard so no other application gets the input
root.grab_keyboard(True, X.GrabModeAsync, X.GrabModeAsync, X.CurrentTime)

# Get keycode for space
space_keycode = d.keysym_to_keycode(XK.string_to_keysym('space'))

# Track process
proc = None

print("Press SPACE to toggle index.cjs on/off.")

while True:
    event = d.next_event()
    if event.type == X.KeyPress:
        if event.detail == space_keycode:
            if proc is None or proc.poll() is not None:
                # Start the process
                print("Starting index.cjs...")
                proc = subprocess.Popen(['node', index_path])
            else:
                # Stop the process
                print("Stopping index.cjs...")
                proc.terminate()
                try:
                    proc.wait(timeout=3)
                except subprocess.TimeoutExpired:
                    print("Process did not exit cleanly. Killing...")
                    proc.kill()
