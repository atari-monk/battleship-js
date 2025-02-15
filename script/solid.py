from typing import Dict

class SOLIDPrinciples:
    def __init__(self):
        self.principles = {
            1: "Single Responsibility Principle (SRP): A class should have only one reason to change.",
            2: "Open/Closed Principle (OCP): Software entities should be open for extension but closed for modification.",
            3: "Liskov Substitution Principle (LSP): Derived classes must be substitutable for their base classes.",
            4: "Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.",
            5: "Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions."
        }

    def get_principles(self) -> Dict[int, str]:
        return self.principles


class UserInput:
    def get_choice(self, principles: Dict[int, str]) -> int:
        try:
            choice = int(input("\nEnter the number corresponding to the SOLID principle: "))
            if choice not in principles:
                raise ValueError("Invalid choice.")
            return choice
        except ValueError as e:
            print(e)
            return -1


class PromptGenerator:
    def generate_prompt(self, principle_description: str) -> str:
        return f"Analyze the following code based on the '{principle_description}' principle:\n\n" \
               "```python\n" \
               "# paste code here\n" \
               "```"


class Display:
    def show_principles(self, principles: Dict[int, str]) -> None:
        print("Choose a SOLID principle to analyze your code by:")
        for key, principle in principles.items():
            print(f"{key}. {principle}")

    def show_generated_prompt(self, prompt: str) -> None:
        print("\nGenerated Prompt:")
        print(prompt)


class SOLIDPromptApp:
    def __init__(self):
        self.solid_principles = SOLIDPrinciples()
        self.user_input = UserInput()
        self.prompt_generator = PromptGenerator()
        self.display = Display()

    def run(self):
        principles = self.solid_principles.get_principles()

        # Display the principles
        self.display.show_principles(principles)

        # Get user choice
        choice = self.user_input.get_choice(principles)
        if choice == -1:
            return

        # Generate and display the prompt
        principle_description = principles[choice]
        prompt = self.prompt_generator.generate_prompt(principle_description)
        self.display.show_generated_prompt(prompt)


if __name__ == "__main__":
    app = SOLIDPromptApp()
    app.run()
