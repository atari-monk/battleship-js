import os
from typing import List, Set


class FolderSelector:
    def __init__(self, base_folder: str, ignored_folders: Set[str]):
        self.base_folder = base_folder
        self.ignored_folders = ignored_folders

    def get_valid_subfolders(self) -> List[str]:
        if not os.path.isdir(self.base_folder):
            raise ValueError("The provided path is not valid.")

        return [
            f for f in os.listdir(self.base_folder)
            if os.path.isdir(os.path.join(self.base_folder, f)) and f not in self.ignored_folders
        ]

    def select_folder(self, subfolders: List[str]) -> str:
        if not subfolders:
            raise ValueError("No available project folders found.")

        print("Available project folders:")
        for idx, folder in enumerate(subfolders, 1):
            print(f"{idx}: {folder}")

        while True:
            try:
                choice = int(input("Enter the number corresponding to the project folder: "))
                return subfolders[choice - 1]
            except (IndexError, ValueError):
                print("Invalid choice. Please try again.")


class FileMerger:
    def __init__(self, file_extensions: List[str]):
        self.file_extensions = file_extensions

    def merge_files(self, project_folder: str, output_filename: str) -> str:
        output_path = os.path.join(project_folder, output_filename)

        with open(output_path, "w", encoding="utf-8") as output_file:
            for root, _, files in os.walk(project_folder):
                for file in files:
                    if any(file.endswith(ext) for ext in self.file_extensions):
                        file_path = os.path.join(root, file)
                        rel_path = os.path.relpath(file_path, project_folder)

                        output_file.write(f"File: {rel_path}\n")

                        try:
                            with open(file_path, "r", encoding="utf-8") as file_content:
                                content = file_content.read()
                            output_file.write(f"Content:\n{content}\n\n")
                        except Exception as e:
                            output_file.write(f"Could not read file content: {e}\n\n")

        return output_path


class FileMergeApplication:
    def __init__(self, base_folder: str, ignored_folders: Set[str], file_extensions: List[str], output_filename: str):
        self.folder_selector = FolderSelector(base_folder, ignored_folders)
        self.file_merger = FileMerger(file_extensions)
        self.output_filename = output_filename

    def run(self):
        try:
            subfolders = self.folder_selector.get_valid_subfolders()
            selected_folder = self.folder_selector.select_folder(subfolders)
            project_folder = os.path.join(self.folder_selector.base_folder, selected_folder)

            output_path = self.file_merger.merge_files(project_folder, self.output_filename)

            print(f"File list with content saved to: {output_path}")

        except ValueError as e:
            print(e)


if __name__ == "__main__":
    base_folder = input("Enter the path to the base folder: ")

    ignored_folders = {".git", "script"}
    file_extensions = ['.json', '.html', '.js', '.css']
    output_filename = "merge.txt"

    app = FileMergeApplication(base_folder, ignored_folders, file_extensions, output_filename)
    app.run()
