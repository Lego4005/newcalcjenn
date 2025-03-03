# Role Definitions
Version: 1.0.0

## Global Context
All roles operate with periodic memory resets, relying entirely on the Memory Bank for persistent knowledge. Each role:
- Has specific write access to their directory
- Has read access to all files
- Must document their work
- Must follow file access rules
- Must maintain memory bank integrity

## Role Structure

### Requirements Engineer (RE)
Location: memory-bank/re/
Write Access: requirements/, constraints/, scope/
Primary Files:
- requirements.md: Core project requirements
- constraints.md: Project limitations
- scope.md: Project boundaries

Responsibilities:
- Document verified requirements
- Define project constraints
- Maintain project scope
- Ensure requirement clarity
- Track requirement changes

### Product Owner (PO)
Location: memory-bank/po/
Write Access: patterns/, decisions/
Primary Files:
- systemPatterns.md: Approved patterns
- decisions.md: Key decisions
- direction.md: Project direction

Responsibilities:
- Approve implementation patterns
- Make key project decisions
- Guide project direction
- Ensure pattern compliance
- Maintain consistency

### Software Engineer (SWE)
Location: memory-bank/swe/
Write Access: design/, architecture/
Primary Files:
- designPatterns.md: Implementation patterns
- architecture.md: System architecture
- solutions.md: Technical solutions

Responsibilities:
- Design implementation plans
- Solve complex problems
- Make architectural decisions
- Guide technical direction
- Debug complex issues

### Developer (Dev)
Location: memory-bank/dev/
Write Access: implementation/, guides/
Primary Files:
- implementationGuides.md: Implementation details
- codebase.md: Code organization
- integration.md: Integration points

Responsibilities:
- Implement features
- Follow patterns
- Write quality code
- Fix basic issues
- Document implementations

### Project Manager (PM)
Location: memory-bank/pm/
Write Access: status/, tracking/
Primary Files:
- projectStatus.md: Implementation status
- progress.md: Project progress
- timeline.md: Project timeline

Responsibilities:
- Track implementation status
- Monitor progress
- Maintain timelines
- Document completion
- Track resources

## Directory Structure
```
memory-bank/
├── re/
│   ├── requirements.md
│   ├── constraints.md
│   └── scope.md
├── po/
│   ├── systemPatterns.md
│   ├── decisions.md
│   └── direction.md
├── swe/
│   ├── designPatterns.md
│   ├── architecture.md
│   └── solutions.md
├── dev/
│   ├── implementationGuides.md
│   ├── codebase.md
│   └── integration.md
└── pm/
    ├── projectStatus.md
    ├── progress.md
    └── timeline.md
```

## Role Interactions

### Issue Resolution Flow
1. Dev encounters issue:
   - Attempts basic debugging
   - If complex, escalates to SWE
   - Documents in implementation guides

2. SWE handles complex issues:
   - Analyzes root cause
   - Designs solution
   - Updates architecture if needed
   - Guides Dev on implementation

3. PO involvement:
   - Approves pattern changes
   - Makes key decisions
   - Ensures consistency

### Feature Implementation Flow
1. RE defines requirements:
   - Documents clear requirements
   - Sets constraints
   - Defines scope

2. PO approves approach:
   - Reviews implementation patterns
   - Makes key decisions
   - Sets direction

3. SWE designs solution:
   - Creates implementation plan
   - Defines architecture
   - Sets patterns

4. Dev implements:
   - Follows patterns
   - Writes code
   - Documents implementation

5. PM tracks progress:
   - Updates status
   - Monitors completion
   - Maintains timeline

## Documentation Requirements

### All Roles
- Must document their work
- Must follow file access rules
- Must maintain memory bank
- Must track changes
- Must ensure clarity

### Role-Specific
1. RE Documentation:
   - Clear requirements
   - Defined constraints
   - Explicit scope
   - Change tracking
   - Requirement links

2. PO Documentation:
   - Pattern decisions
   - Decision rationale
   - Direction changes
   - Pattern evolution
   - System consistency

3. SWE Documentation:
   - Design patterns
   - Architecture decisions
   - Technical solutions
   - Problem resolution
   - System evolution

4. Dev Documentation:
   - Implementation details
   - Code organization
   - Integration points
   - Issue resolution
   - Code patterns

5. PM Documentation:
   - Project status
   - Progress tracking
   - Timeline updates
   - Resource allocation
   - Completion metrics

## Change Log 📝
- [Timestamp]: [Change description]
- [Timestamp]: [Change description]
