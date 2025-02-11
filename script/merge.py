import os

def main():
    base_folder = input("Enter the path to the base folder: ")
    if not os.path.isdir(base_folder):
        print("The provided path is not valid. Exiting.")
        return

    ignored_projects = {".git", "script"}

    print("Available project folders:")
    subfolders = [
        f for f in os.listdir(base_folder)
        if os.path.isdir(os.path.join(base_folder, f)) and f not in ignored_projects
    ]

    if not subfolders:
        print("No available project folders found.")
        return

    for idx, folder in enumerate(subfolders, 1):
        print(f"{idx}: {folder}")

    choice = input("Enter the number corresponding to the project folder: ")
    try:
        selected_folder = subfolders[int(choice) - 1]
    except (IndexError, ValueError):
        print("Invalid choice. Exiting.")
        return

    project_folder = os.path.join(base_folder, selected_folder)

    file_extensions = ['.json', '.html', '.js', '.css']

    output_file = os.path.join(project_folder, "merge.txt")

    with open(output_file, "w", encoding="utf-8") as f:
        for root, _, files in os.walk(project_folder):
            for file in files:
                if any(file.endswith(ext) for ext in file_extensions):
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, project_folder)
                    f.write(f"File: {rel_path}\n")
                    
                    try:
                        with open(file_path, "r", encoding="utf-8") as file_content:
                            content = file_content.read()
                        f.write(f"Content:\n{content}\n\n")
                    except Exception as e:
                        f.write(f"Could not read file content: {e}\n\n")

    print(f"File list with content saved to: {output_file}")

if __name__ == "__main__":
    main()
