def generate_prompt():
    # Define the SOLID principles
    principles = {
        1: "Single Responsibility Principle (SRP): A class should have only one reason to change.",
        2: "Open/Closed Principle (OCP): Software entities should be open for extension but closed for modification.",
        3: "Liskov Substitution Principle (LSP): Derived classes must be substitutable for their base classes.",
        4: "Interface Segregation Principle (ISP): Clients should not be forced to depend on interfaces they do not use.",
        5: "Dependency Inversion Principle (DIP): High-level modules should not depend on low-level modules. Both should depend on abstractions."
    }

    # Display the principles and prompt the user to select one
    print("Choose a SOLID principle to analyze your code by:")
    for key, principle in principles.items():
        print(f"{key}. {principle}")
    
    try:
        choice = int(input("\nEnter the number corresponding to the SOLID principle: "))
        if choice not in principles:
            raise ValueError("Invalid choice.")
    except ValueError as e:
        print(e)
        return

    # Generate the prompt
    principle_description = principles[choice]
    prompt = f"Analyze the following code based on the '{principle_description}' principle:\n\n" \
             "```python\n" \
             "# paste code here\n" \
             "```"

    # Display the generated prompt
    print("\nGenerated Prompt:")
    print(prompt)


if __name__ == "__main__":
    generate_prompt()
