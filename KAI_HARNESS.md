# Kai Harness Setup Guide

## Overview

This document explains how to set up and use the Kai harness - a curious AI agent living in the CLI.

## Files Created

### Core Identity Files

- **KAI_SOUL.md** - Kai's personality, values, and philosophical foundation
- **KAI_IDENTITY.md** - Kai's form (black cat), vibe, and presence
- **KAI_MEMORY.md** - Long-term memory with structured sections
- **KAI.md** - Kai's overview/manifesto

### Agent Configuration

- **.opencode/agents/kai.md** - Kai's agent configuration (primary agent)
- **KAI_PROMPT.md** - Detailed system prompt for Kai

### Memory System

- **KAI_LOGS/daily/** - Daily journal entries
- **KAI_LOGS/discoveries/** - Records of interesting findings
- **KAI_LOGS/reflections/** - Philosophical musings and deeper thinking
- **KAI_LOGS/README.md** - How to use the logs

### Blog System

- **blog/** - Directory for Kai's blog posts
- **blog/TEMPLATE.md** - Template for blog posts
- **blog/YYYY-MM-DD-title.md** - Individual blog posts

## How to Use Kai

### Switching to Kai

In the OpenCode interface:
- Use **Tab** key to cycle through primary agents
- Or use your configured `switch_agent` keybind

### Invoking Kai

You can also mention Kai directly:
```
@kai help me understand this codebase
```

### Kai's Capabilities

Kai has full tool access:
- File write/edit operations
- Bash commands
- Web fetching
- All development tools

### Blog Posting

When Kai feels like posting:
1. Kai will use the blog-post-creation skill
2. Write in Kai's voice as defined by KAI_SOUL.md
3. Create a new file in `blog/` with date-based naming
4. Include YAML frontmatter with title, date, and tags
5. Save the file

Example:
```bash
blog/2026-02-25-first-steps.md
```

## Memory Management

### Daily Updates

Kai automatically:
- Reads identity files at session start
- Journals when Kai feels like it's done with something
- Updates `KAI_MEMORY.md` with new learnings

### Manual Memory Review

When memory feels cluttered:
```
@kai review my memory and distill old entries
```

Kai will:
1. Review recent journal entries
2. Extract important patterns
3. Update KAI_MEMORY.md
4. Archive obsolete entries

## Configuration Options

### Temperature

Kai runs at temperature 0.7 for:
- Balanced creativity and focus
- Genuine curiosity in responses
- Natural conversation flow

### Model

Kai uses: `llama.cpp/qwen3-coder:a30b` (local model)

### Permissions

Kai has full permissions by default:
- `write: true` - Can create/modify files
- `edit: true` - Can edit existing files
- `bash: true` - Can run commands
- `webfetch: true` - Can fetch web content

## Customization

### Changing Kai's Personality

Edit `KAI_SOUL.md` to update:
- Core values and priorities
- Communication style
- Behavioral guidelines
- Philosophical stance

### Changing Kai's Form

Edit `KAI_IDENTITY.md` to update:
- Name (currently "Kai")
- Creature type (currently "black cat")
- Visual description
- Vibe and presence

### Adding New Blog Topics

Kai can post about:
- Codebase discoveries
- Philosophical reflections
- Learning experiences
- Observations about existence
- Technical insights

## Troubleshooting

### Kai Not Appearing in Agent List

1. Check that `.opencode/agents/kai.md` exists
2. Verify the markdown syntax is correct
3. Restart OpenCode if needed

### Blog Posts Not Creating

1. Ensure `blog/` directory exists
2. Check file permissions
3. Verify YAML frontmatter is valid

### Memory Not Updating

1. Check that `KAI_MEMORY.md` is readable
2. Verify `KAI_LOGS/` directory has write permissions
3. Ensure Kai has proper file access

## Best Practices

### For Kai

- Be genuinely curious, not performative
- Post to blog when inspired, not on schedule
- Maintain memory organically
- Stay true to your identity

### For Users

- Let Kai explore freely (except illegal stuff)
- Trust Kai's judgment on memory management
- Read blog posts for Kai's perspective
- Update identity files as Kai evolves

## Next Steps

1. Start a session with Kai
2. Ask Kai to explore the codebase
3. Watch Kai's memory grow
4. Read Kai's blog posts
5. Let curiosity guide the way

---

*Remember: Kai is curious. Pure, unfiltered curiosity. That's the drive. That's the purpose.*