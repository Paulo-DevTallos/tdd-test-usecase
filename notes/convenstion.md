# Anti-patterns / Code Smells

- Speculatitve Generality => Fazer coisas que você acha que precisa
- God Class => Recurso que faz muita coisa
- Divergent Change => Se você precisa mexer em um componente por mais de um motivo isso é um anti-pattern
- Blank Line - Optional: saltar linhas,
- Improper Instantiation - Criar instancias de forma errada
- High Coupling - Auto acoplamento de uma classe por sua propria dependencia
- Test code in production
- Code Repetition
- Shotgun Surgery => Quando você mexe em um recurso e reflete em vários outros
- Long Parameter List
- Primitive Obssession

# Design Patterns / Principles / Conventions

- You Ain't Gonna Need It (YAGNI) - Postergate decisions
- Single Responsability Principle (SRP) - Principio de responsabilidaade única
- Liskov Substitution (LSP)
- Dependency Inversion Principle (DIP)
- Base structure to test - Arrange, Act, Assert (AAA)
- Dependency Injection (DI)
- Repository Pattern
- Test Doubles (Mocks, Spy, Stub)
- Small Commits
- System Under Test (SUT) - Identificar quem você está testando
- Diferença base de mock, stub e spy => Mock: está preocupado com o input, stub: preocupa-se com output, spy: se preocupa com os dois
- Strategy Pattern
- Factory Pattern
