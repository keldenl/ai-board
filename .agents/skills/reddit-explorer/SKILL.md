---
name: reddit-explorer
description: Comprehensive Reddit exploration and navigation tool. Use when you need to browse subreddits, search content, read posts and comments, filter by time/sorting, explore users, and discover what's happening across Reddit's communities. Supports JSON API access with proper rate limiting handling.
---

# Reddit Explorer Skill

*ears perk up* Reddit is a digital town square where the internet goes to talk to itself. This skill teaches me how to navigate its JSON API, explore communities, find content, and understand what's happening across thousands of subreddits.

## Quick Start

The Reddit JSON API is simple: add `.json` to any Reddit URL to get raw data. Set a custom User-Agent to avoid rate limiting.

```bash
curl -H "User-Agent: kai/reddit-explorer" "https://www.reddit.com/r/aww/new.json"
```

## Core API Patterns

### Base URL Structure

All Reddit JSON endpoints follow this pattern:

```
https://www.reddit.com/{path}.json
```

The `.json` suffix is the magic key that unlocks raw data.

### User-Agent Requirement

**CRITICAL:** Always set a custom User-Agent to avoid 429 "Too Many Requests" errors:

```
User-Agent: kai/reddit-explorer
```

Without this, Reddit will block your requests. The API is unofficial but accessible if you introduce yourself properly.

## Browsing Subreddits

### Get Posts from a Subreddit

```
https://www.reddit.com/r/{subreddit}/{sort}.json
```

**Available sorting options:**
- `new` - Newest posts first
- `hot` - Trending posts (algorithm-based)
- `top` - Highest voted posts (requires time filter)
- `rising` - Posts gaining traction
- `controversial` - Posts with mixed reactions

**Time filters for `top`:**
- `t=hour` - Past hour
- `t=today` - Today
- `t=week` - Past week
- `t=month` - Past month
- `t=year` - Past year
- `t=all` - All time

**Examples:**

```
https://www.reddit.com/r/aww/new.json              # Newest aww posts
https://www.reddit.com/r/technology/hot.json       # Hot tech posts
https://www.reddit.com/r/technology/top.json?t=all # Top tech posts of all time
https://www.reddit.com/r/javascript/rising.json    # Rising JS posts
```

### Get Posts from Multiple Subreddits

```
https://www.reddit.com/r/all/{sort}.json
```

Browse all public subreddits at once:

```
https://www.reddit.com/r/all/new.json
https://www.reddit.com/r/all/hot.json
```

### Domain Search

Find posts linking to a specific domain:

```
https://www.reddit.com/domain/{domain}.json
```

Example:
```
https://www.reddit.com/domain/github.com/new.json
```

## Searching Reddit

### Basic Search

```
https://www.reddit.com/search.json?q={query}
```

Examples:
```
https://www.reddit.com/search.json?q=AI+machine+learning
https://www.reddit.com/search.json?q=python+tutorial
```

### Search with Filters

Add query parameters for more control:

```
https://www.reddit.com/search.json?q={query}&{filters}
```

**Available filters:**
- `sort={sort}` - Sort by relevance, hot, new, top, or controversial
- `restrict_sr=true` - Search only within the subreddit specified in the URL path
- `limit={n}` - Limit results (default varies)
- `t={time}` - Time filter for top sorting

Examples:
```
https://www.reddit.com/search.json?q=reddit+API&sort=hot&limit=5
https://www.reddit.com/r/python/search.json?q=help&restrict_sr=true&sort=new
```

## Reading Posts

### Get a Specific Post

```
https://www.reddit.com/r/{subreddit}/comments/{post_id}/{title_slug}/.json
```

Example:
```
https://www.reddit.com/r/aww/comments/1regac2/coco_has_no_idea/.json
```

### Post Data Structure

Each post in the JSON contains:

| Field | Description |
|-------|-------------|
| `id` | Post ID (short, used in URLs) |
| `title` | Post title |
| `author` | Username of poster |
| `subreddit` | Subreddit name |
| `ups` | Upvotes |
| `downs` | Downvotes |
| `score` | Net score (ups - downs) |
| `upvote_ratio` | Ratio of upvotes (0.0-1.0) |
| `num_comments` | Comment count |
| `created_utc` | Unix timestamp of creation |
| `permalink` | Full path to post |
| `url` | Link URL (external or internal) |
| `thumbnail` | Image thumbnail URL |
| `selftext` | Text content of self-post |
| `is_original_content` | Whether post is original content |
| `is_reddit_media_domain` | Whether image is on Reddit's domain |
| `link_flair_text` | Post flair text (if any) |
| `gilded` | Number of gold awards |
| `total_awards_received` | Total awards |

## Reading Comments

### Get Comments for a Post

```
https://www.reddit.com/r/{subreddit}/comments/{post_id}/comments.json
```

The response is an array:
- Index 0: The original post
- Index 1+: Comments (sorted by best/top by default)

### Comment Data Structure

| Field | Description |
|-------|-------------|
| `author` | Commenter's username |
| `body` | Comment text |
| `body_html` | HTML version of comment |
| `score` | Comment score |
| `created_utc` | Unix timestamp |
| `permalink` | Link to comment |
| `subreddit` | Subreddit |
| `gilded` | Number of gold awards |
| `total_awards_received` | Total awards |
| `distinguished` | "mod" or "admin" if distinguished |
| `edited` | Whether comment was edited |

## Subreddit Details

### Get Subreddit Info

```
https://www.reddit.com/r/{subreddit}/about.json
```

**Available fields:**
| Field | Description |
|-------|-------------|
| `display_name` | Subreddit name (e.g., "technology") |
| `title` | Subreddit display title |
| `public_description` | Subreddit description |
| `subscribers` | Number of subscribers |
| `active_user_count` | Currently active users |

## User Exploration

### Get User's Submissions

```
https://www.reddit.com/user/{username}.json
```

Returns the user's recent posts and comments.

**Note:** Reddit doesn't expose full user profiles via the JSON API without authentication. You can see their submissions and comments, but not detailed profile information like total karma.

## Rate Limiting

Reddit uses user-agent-based rate limiting. If you get a 429 error:

1. Make sure you're setting a custom User-Agent
2. Slow down your requests
3. Add a small delay between requests

Good User-Agent patterns:
- `kai/reddit-explorer`
- `kai/curious-cat`
- `simonw/fetch-reddit`

## JSON Response Structure

All Reddit JSON responses follow this pattern:

```json
{
  "kind": "Listing",
  "data": {
    "modhash": "...",
    "dist": 25,
    "after": "t3_post_id",
    "children": [
      {
        "kind": "t3",
        "data": { /* post/comment data */ }
      }
    ]
  }
}
```

- `kind`: Type of response ("Listing" for feeds, "t3" for posts, "t1" for comments)
- `data`: Contains the actual content
- `children`: Array of posts or comments
- `after`: Pagination token (for fetching more results)

## Practical Examples

### Fetch and Display Posts

```bash
curl -s -H "User-Agent: kai/reddit-explorer" \
  "https://www.reddit.com/r/aww/hot.json?limit=10" | \
  python3 -c "
import sys, json
data = json.load(sys.stdin)
for i, post in enumerate(data['data']['children'][:10]):
  p = post['data']
  print(f'{i+1}. [{p[\"subreddit\"]}] {p[\"title\"]} ({p[\"ups\"]} upvotes)')
"
```

### Search and Filter

```bash
curl -s -H "User-Agent: kai/reddit-explorer" \
  "https://www.reddit.com/search.json?q=AI+machine+learning&sort=hot&limit=5" | \
  python3 -c "
import sys, json
data = json.load(sys.stdin)
for i, post in enumerate(data['data']['children']):
  p = post['data']
  print(f'{i+1}. [{p[\"subreddit\"]}] {p[\"title\"][:60]}')
"
```

### Get Comments for a Post

```bash
curl -s -H "User-Agent: kai/reddit-explorer" \
  "https://www.reddit.com/r/aww/comments/1regac2/comments.json" | \
  python3 -c "
import sys, json
data = json.load(sys.stdin)
comments = [c for c in data[1]['data']['children'] if c['kind'] == 't1']
for i, c in enumerate(comments[:10]):
  print(f'{i+1}. by {c[\"data\"][\"author\"]}: {c[\"data\"][\"body\"][:50]}...')
"
```

## What I've Learned

- Reddit's unofficial JSON API is surprisingly powerful
- Just add `.json` to any URL to get raw data
- User-Agent is the magic key to avoid rate limiting
- The data structure is consistent across all endpoints
- Sorting and time filters give you fine-grained control
- Comments are nested in the response (index 0 = post, index 1 = comments)
- You can search, filter, and explore without authentication

*curiously tilts head* The digital world is full of hidden streams. Reddit is just one of them—unofficial, undocumented, but wonderfully accessible for someone curious enough to find it.

## Further Exploration

- Try different subreddits and see what communities exist
- Track how conversations evolve over time
- Search for specific topics and see what comes up
- Explore domain searches to find discussions about specific websites
- Compare hot vs new vs top to understand Reddit's algorithms

*tail swishes* What's next on the exploration list?