import pyperclip
import re
from typing import List, Optional

class Messages:
    MENU_PROMPT = "Select a category:"
    INVALID_CHOICE = "Invalid choice. Please select a number from the menu."
    INVALID_NUMBER = "Please enter a valid number."
    SCOPE_PROMPT = "Enter the scope (or leave blank for none): "
    INVALID_SCOPE = "Invalid scope. Use only letters, numbers, hyphens, underscores, or dots."
    DESCRIPTION_PROMPT = "Enter a short description of the change: "
    DESCRIPTION_INVALID = "Description is required and must be 50 characters or less."
    NOTES_PROMPT = "Enter additional notes (optional, press Enter to skip): "
    GENERATED_MESSAGE = "\nGenerated Commit Message:"
    GENERATED_MESSAGE_SEPARATOR = "-" * 30
    COPIED_TO_CLIPBOARD = "Commit message copied to clipboard!"
    PROGRAM_START = "Git Commit Message Generator"

class CategorySelector:
    def __init__(self, categories: List[str]):
        self.categories = categories

    def display_menu(self) -> None:
        print(Messages.MENU_PROMPT)
        for i, category in enumerate(self.categories, 1):
            print(f"{i}. {category}")

    def get_category(self) -> str:
        while True:
            try:
                choice = int(input("Enter the number corresponding to the category: "))
                if 1 <= choice <= len(self.categories):
                    return self.categories[choice - 1]
                print(Messages.INVALID_CHOICE)
            except ValueError:
                print(Messages.INVALID_NUMBER)

class UserInput:
    SCOPE_REGEX = r"^[a-zA-Z0-9-_.]*$"

    @staticmethod
    def get_scope() -> str:
        while True:
            scope = input(Messages.SCOPE_PROMPT)
            if re.match(UserInput.SCOPE_REGEX, scope):
                return scope
            print(Messages.INVALID_SCOPE)

    @staticmethod
    def get_description() -> str:
        while True:
            description = input(Messages.DESCRIPTION_PROMPT)
            if description and len(description) <= 50:
                return description
            print(Messages.DESCRIPTION_INVALID)

    @staticmethod
    def get_notes() -> Optional[str]:
        notes = input(Messages.NOTES_PROMPT)
        return notes.strip() if notes.strip() else None

class CommitMessageFormatter:
    @staticmethod
    def format(category: str, scope: str, description: str, notes: Optional[str]) -> str:
        scope_part = f"({scope})" if scope else ""
        header = f"{category}{scope_part}: {description}"
        return f"{header}\n\n{notes}" if notes else header

class Clipboard:
    @staticmethod
    def copy_to_clipboard(text: str) -> None:
        pyperclip.copy(text)
        print(Messages.COPIED_TO_CLIPBOARD)

class CommitMessageGenerator:
    def __init__(self, categories: List[str]):
        self.category_selector = CategorySelector(categories)
        self.input_handler = UserInput()
        self.formatter = CommitMessageFormatter()
        self.clipboard = Clipboard()

    def run(self) -> None:
        print(Messages.PROGRAM_START)
        self.category_selector.display_menu()

        category = self.category_selector.get_category()
        scope = self.input_handler.get_scope()
        description = self.input_handler.get_description()
        notes = self.input_handler.get_notes()

        commit_message = self.formatter.format(category, scope, description, notes)

        print(Messages.GENERATED_MESSAGE)
        print(Messages.GENERATED_MESSAGE_SEPARATOR)
        print(commit_message)
        print(Messages.GENERATED_MESSAGE_SEPARATOR)

        self.clipboard.copy_to_clipboard(commit_message)

if __name__ == "__main__":
    categories = ["feat", "fix", "chore", "docs", "style", "refactor", "test", "perf"]
    generator = CommitMessageGenerator(categories)
    generator.run()
