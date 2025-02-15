import time
from threading import Thread
from abc import ABC, abstractmethod

class FrequencyRange:
    def __init__(self, start_freq=40, end_freq=8000, step_freq=500):
        self.start_freq = start_freq
        self.end_freq = end_freq
        self.step_freq = step_freq

    def generate_frequencies(self):
        return range(self.start_freq, self.end_freq, self.step_freq)

class SoundGenerator(ABC):
    @abstractmethod
    def generate_sound(self, frequency: int, duration: int):
        pass

class WinsoundGenerator(SoundGenerator):
    def generate_sound(self, frequency: int, duration: int):
        import winsound
        try:
            winsound.Beep(int(frequency), duration)
        except Exception as e:
            print(f"Error generating sound with winsound: {e}")

class FrequencySweep:
    def __init__(self, frequency_range: FrequencyRange, sound_generator: SoundGenerator, duration=1000):
        self.frequency_range = frequency_range
        self.sound_generator = sound_generator
        self.duration = duration

    def start(self):
        Thread(target=self.play_frequency_sweep, daemon=True).start()

    def play_frequency_sweep(self):
        for freq in self.frequency_range.generate_frequencies():
            print(f"Playing frequency: {freq} Hz")
            self.sound_generator.generate_sound(freq, self.duration)
            time.sleep(0.1)

class PianoFrequencySweep:
    def __init__(self, sound_generator: SoundGenerator, duration=1000):
        self.sound_generator = sound_generator
        self.duration = duration
        self.keys = range(40, 61)  # Middle octave (C3 to C5), key numbers 40 to 60

    def start(self):
        Thread(target=self.play_piano_frequency_sweep, daemon=True).start()

    def play_piano_frequency_sweep(self):
        for key_number in self.keys:
            frequency = self.key_to_frequency(key_number)
            print(f"Playing frequency for key {key_number}: {frequency} Hz")
            self.sound_generator.generate_sound(int(frequency), self.duration)  # Ensure frequency is an int
            time.sleep(0.1)

    def key_to_frequency(self, key_number: int):
        return 440 * (2 ** ((key_number - 49) / 12))

class TwinkleTwinkleMelody:
    def __init__(self, sound_generator: SoundGenerator, duration=1000):
        self.sound_generator = sound_generator
        self.duration = duration
        # Correct mapping of notes to key numbers (C4 = 52, D4 = 54, E4 = 56, F4 = 57, G4 = 59, A4 = 61)
        self.notes = [
            52, 52, 59, 59, 61, 61, 59,  # Twinkle, twinkle, little star
            57, 57, 56, 56, 54, 54, 52,  # How I wonder what you are
            59, 59, 57, 57, 56, 56, 54,  # Up above the world so high
            59, 59, 57, 57, 56, 56, 54,  # Like a diamond in the sky
            52, 52, 59, 59, 61, 61, 59,  # Twinkle, twinkle, little star
            57, 57, 56, 56, 54, 54, 52   # How I wonder what you are
        ]

        # Create the durations for each note
        self.durations = [
            300, 300, 300, 300, 300, 300, 600,  # Twinkle, twinkle, little star
            300, 300, 300, 300, 300, 300, 600,  # How I wonder what you are
            300, 300, 300, 300, 300, 300, 600,  # Up above the world so high
            300, 300, 300, 300, 300, 300, 600,  # Like a diamond in the sky
            300, 300, 300, 300, 300, 300, 600,  # Twinkle, twinkle, little star
            300, 300, 300, 300, 300, 300, 600   # How I wonder what you are
        ]

    def start(self):
        Thread(target=self.play_melody, daemon=True).start()

    def play_melody(self):
        for note, duration in zip(self.notes, self.durations):
            frequency = self.key_to_frequency(note)
            print(f"Playing note {note} ({self.key_number_to_name(note)}): {frequency} Hz")
            self.sound_generator.generate_sound(int(frequency), duration)  # Ensure frequency is an int
            time.sleep(duration / 1000.0)

    def key_to_frequency(self, key_number: int):
        return 440 * (2 ** ((key_number - 49) / 12))

    def key_number_to_name(self, key_number: int):
        notes = {
            40: "C3", 41: "C#3", 42: "D3", 43: "D#3", 44: "E3", 45: "F3", 46: "F#3", 47: "G3",
            48: "G#3", 49: "A3", 50: "A#3", 51: "B3", 52: "C4", 53: "C#4", 54: "D4", 55: "D#4",
            56: "E4", 57: "F4", 58: "F#4", 59: "G4", 60: "G#4"
        }
        return notes.get(key_number, "Unknown")

class HappyBirthdayMelody:
    def __init__(self, sound_generator: SoundGenerator, duration=300):
        self.sound_generator = sound_generator
        self.duration = duration
        # Mapping of notes to key numbers for "Happy Birthday"
        self.notes = [
            59, 59, 61, 59, 52, 61,  # Happy birthday to you
            59, 59, 61, 59, 64, 62,  # Happy birthday to you
            59, 59, 68, 66, 64, 62, 61,  # Happy birthday dear [Name]
            57, 57, 59, 52, 61, 59   # Happy birthday to you
        ]

        # Durations of each note (in ms)
        self.durations = [
            300, 300, 300, 300, 300, 600,  # Happy birthday to you
            300, 300, 300, 300, 300, 600,  # Happy birthday to you
            300, 300, 300, 300, 300, 300, 600,  # Happy birthday dear [Name]
            300, 300, 300, 300, 300, 600   # Happy birthday to you
        ]

    def start(self):
        Thread(target=self.play_melody, daemon=True).start()

    def play_melody(self):
        for note, duration in zip(self.notes, self.durations):
            frequency = self.key_to_frequency(note)
            print(f"Playing note {note} ({self.key_number_to_name(note)}): {frequency} Hz")
            self.sound_generator.generate_sound(int(frequency), duration)  # Ensure frequency is an int
            time.sleep(duration / 1000.0)

    def key_to_frequency(self, key_number: int):
        return 440 * (2 ** ((key_number - 49) / 12))

    def key_number_to_name(self, key_number: int):
        notes = {
            40: "C3", 41: "C#3", 42: "D3", 43: "D#3", 44: "E3", 45: "F3", 46: "F#3", 47: "G3",
            48: "G#3", 49: "A3", 50: "A#3", 51: "B3", 52: "C4", 53: "C#4", 54: "D4", 55: "D#4",
            56: "E4", 57: "F4", 58: "F#4", 59: "G4", 60: "G#4", 61: "A4", 62: "A#4", 63: "B4",
            64: "C5", 65: "C#5", 66: "D5", 67: "D#5", 68: "E5"
        }
        return notes.get(key_number, "Unknown")
    
class JingleBellsMelody:
    def __init__(self, sound_generator: SoundGenerator, duration=300):
        self.sound_generator = sound_generator
        self.duration = duration
        self.notes = [
            52, 52, 52, 52, 52, 52, 52, 59, 48, 50, 52,  # Jingle bells, jingle bells
            53, 53, 53, 53, 53, 52, 52, 52, 52, 52,  # Jingle all the way
            52, 52, 52, 59, 48, 50, 52,  # Oh! what fun it is to ride
            59, 59, 59, 53, 50, 52, 48   # In a one horse open sleigh
        ]
        self.durations = [
            300, 300, 300, 300, 300, 300, 300, 600, 300, 300, 300,  # Jingle bells, jingle bells
            300, 300, 300, 300, 300, 300, 600, 300, 300, 300,  # Jingle all the way
            300, 300, 300, 600, 300, 300, 600,  # Oh! what fun it is to ride
            300, 300, 300, 600, 300, 300, 600  # In a one horse open sleigh
        ]

    def start(self):
        Thread(target=self.play_melody, daemon=True).start()

    def play_melody(self):
        for note, duration in zip(self.notes, self.durations):
            frequency = self.key_to_frequency(note)
            print(f"Playing note {note} ({self.key_number_to_name(note)}): {frequency} Hz")
            self.sound_generator.generate_sound(int(frequency), duration)  # Ensure frequency is an int
            time.sleep(duration / 1000.0)

    def key_to_frequency(self, key_number: int):
        return 440 * (2 ** ((key_number - 49) / 12))

    def key_number_to_name(self, key_number: int):
        notes = {
            40: "C3", 41: "C#3", 42: "D3", 43: "D#3", 44: "E3", 45: "F3", 46: "F#3", 47: "G3",
            48: "G#3", 49: "A3", 50: "A#3", 51: "B3", 52: "C4", 53: "C#4", 54: "D4", 55: "D#4",
            56: "E4", 57: "F4", 58: "F#4", 59: "G4", 60: "G#4", 61: "A4", 62: "A#4", 63: "B4",
            64: "C5", 65: "C#5", 66: "D5", 67: "D#5", 68: "E5"
        }
        return notes.get(key_number, "Unknown")

def main():
    songs = [
        ("1. Frequency Sweep", FrequencySweep),
        ("2. Piano Frequency Sweep", PianoFrequencySweep),
        ("3. Twinkle Twinkle Little Star Melody", TwinkleTwinkleMelody),
        ("4. Happy Birthday Melody", HappyBirthdayMelody),
        ("5. Jingle Bells Melody", JingleBellsMelody),
    ]

    print("Select the type of sweep or melody to run:")
    for song in songs:
        print(song[0])

    choice = input("Enter your choice (number): ")

    frequency_range = FrequencyRange(start_freq=40, end_freq=8000, step_freq=500)
    sound_generator = WinsoundGenerator()

    selected_song = next((song for label, song in songs if choice in label), None)

    if selected_song == FrequencySweep:
        sweep = selected_song(frequency_range=frequency_range, sound_generator=sound_generator)
        sweep.start()
    elif selected_song == PianoFrequencySweep:
        sweep = selected_song(sound_generator=sound_generator)
        sweep.start()
    elif selected_song in [TwinkleTwinkleMelody, HappyBirthdayMelody, JingleBellsMelody]:
        melody = selected_song(sound_generator=sound_generator)
        melody.start()
    else:
        print("Invalid choice. Please select a valid option.")

    while True:
        time.sleep(1)

if __name__ == "__main__":
    main()
