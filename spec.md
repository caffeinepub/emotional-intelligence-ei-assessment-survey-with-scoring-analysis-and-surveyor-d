# Footballer App

## Current State
New project — no existing code.

## Requested Changes (Diff)

### Add
- 4-section footballer app: Quiz, Food, Training, Profile
- **Quiz section**: 50 FIFA/soccer MCQ questions from Open Trivia DB API; shuffled answers; buzzer sound + red highlight on wrong answer; confetti animation + green highlight on correct answer; score tracker
- **Food section**: Diet planner with clickable food items showing calories + health benefits; age-group-based food recommendations (Under 12, 13-17, 18-30, 31+); camera capture + image upload to detect food calories via free API (Nutritionix or similar)
- **Training section**: Embedded YouTube videos of football drills and exercises from channels like All Attack and Unisport; categorized by skill type (ball control, passing, shooting, fitness)
- **Home/Profile section**: App landing with footballer branding, navigation to all sections

### Modify
- Nothing (new project)

### Remove
- Nothing

## Implementation Plan
1. Backend: store quiz high scores per session; store user age group preference
2. Frontend Quiz: fetch 50 soccer questions from Open Trivia DB; shuffle answers; play buzzer audio on wrong; show confetti on correct; track score
3. Frontend Food: grid of food items with click-to-reveal calories/benefits; age group selector for recommendations; camera/upload food image panel
4. Frontend Training: YouTube embedded iframes organized by category (ball control, passing, shooting, fitness)
5. Navigation: tab-based navigation between 4 sections
