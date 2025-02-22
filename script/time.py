import time
import winsound
import os
import tkinter as tk
from threading import Thread

class Alarm:
    def __init__(self, duration, sound_frequency=1000, sound_time=2000):
        self.duration = duration * 60
        self.sound_frequency = sound_frequency
        self.sound_time = sound_time

    def start(self):
        print(f"Alarm set for {self.duration // 60} minutes.")
        time.sleep(self.duration)
        Thread(target=self.show_red_screen, daemon=True).start()
        self.play_sound()

    def show_red_screen(self):
        root = tk.Tk()
        root.attributes('-fullscreen', True)
        root.configure(bg='red')
        root.attributes('-topmost', True)

        label = tk.Label(root, text="TIME IS UP!", font=("Arial", 50, "bold"), fg="white", bg="red")
        label.pack(expand=True)

        root.bind("<Escape>", lambda e: root.destroy())
        root.bind("<Button-1>", lambda e: root.destroy())
        root.mainloop()

    def play_sound(self):
        try:
            winsound.Beep(self.sound_frequency, self.sound_time)
        except Exception:
            os.system('say "Time is up"')
            os.system(f'play -nq -t alsa synth {self.sound_time / 1000} sine {self.sound_frequency}')

if __name__ == "__main__":
    try:
        duration = int(input("Enter alarm duration in minutes (default 20): ") or 20)
        if duration <= 0:
            raise ValueError("Duration must be a positive number.")
    except ValueError as e:
        print(f"Invalid input: {e}. Using default 20 minutes.")
        duration = 20

    alarm = Alarm(duration)
    alarm.start()
