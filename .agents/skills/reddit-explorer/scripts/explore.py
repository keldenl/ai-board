#!/usr/bin/env python3
"""
Reddit Explorer Utility
A helper script for exploring Reddit's JSON API.

Usage:
    python3 reddit_explorer.py <command> [arguments]

Commands:
    browse <subreddit> [sort]    Browse subreddit posts (new/hot/top/rising)
    search <query> [sort]        Search Reddit
    comments <subreddit> <id>    Get comments for a post
    details <subreddit>          Get subreddit details
    top <subreddit> [time]       Get top posts (hour/today/week/month/year/all)
"""

import requests
import json
import sys
from datetime import datetime

USER_AGENT = "kai/reddit-explorer"


def fetch(url, params=None):
    """Fetch Reddit JSON with proper headers."""
    headers = {"User-Agent": USER_AGENT}
    try:
        response = requests.get(url, headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.HTTPError as e:
        print(f"Error: {e}")
        sys.exit(1)


def format_post(post):
    """Format a post for display."""
    p = post["data"]
    title = p["title"][:60] + "..." if len(p["title"]) > 60 else p["title"]
    return f"  [{p['subreddit']}] {title} ({p['ups']} upvotes, {p['num_comments']} comments)"


def format_comment(comment):
    """Format a comment for display."""
    c = comment["data"]
    body = c["body"][:50] + "..." if len(c["body"]) > 50 else c["body"]
    author = c["author"] or "[deleted]"
    return f"  @{author}: {body} ({c['score']} points)"


def cmd_browse(args):
    """Browse subreddit posts."""
    if len(args) < 1:
        print("Usage: browse <subreddit> [sort]")
        print("Sort options: new, hot, top, rising, controversial")
        return

    subreddit = args[0]
    sort = args[1] if len(args) > 1 else "hot"

    url = f"https://www.reddit.com/r/{subreddit}/{sort}.json"
    data = fetch(url, {"limit": 10})

    print(f"\n📰 r/{subreddit} - {sort.upper()} posts\n")
    for i, post in enumerate(data["data"]["children"][:10], 1):
        print(f"{i}.", format_post(post))


def cmd_search(args):
    """Search Reddit."""
    if len(args) < 1:
        print("Usage: search <query> [sort]")
        print("Sort options: relevance, hot, new, top, controversial")
        return

    query = " ".join(args[:-1]) if len(args) > 1 else args[0]
    sort = (
        args[-1]
        if args[-1] in ["relevance", "hot", "new", "top", "controversial"]
        else "hot"
    )

    url = "https://www.reddit.com/search.json"
    data = fetch(url, {"q": query, "sort": sort, "limit": 10})

    print(f'\n🔍 Search results for "{query}"\n')
    for i, post in enumerate(data["data"]["children"][:10], 1):
        print(f"{i}.", format_post(post))


def cmd_comments(args):
    """Get comments for a post."""
    if len(args) < 2:
        print("Usage: comments <subreddit> <post_id>")
        return

    subreddit, post_id = args[0], args[1]
    url = f"https://www.reddit.com/r/{subreddit}/comments/{post_id}/comments.json"
    data = fetch(url)

    # First element is the post, second is comments
    if len(data) < 2:
        print("Could not fetch comments.")
        return

    post = data[0]["data"]["children"][0]["data"]
    print(f"\n📝 Comments for: {post['title']}\n")

    comments = [c for c in data[1]["data"]["children"] if c["kind"] == "t1"]
    for i, comment in enumerate(comments[:10], 1):
        print(f"{i}.", format_comment(comment))


def cmd_details(args):
    """Get subreddit details."""
    if len(args) < 1:
        print("Usage: details <subreddit>")
        return

    subreddit = args[0]
    url = f"https://www.reddit.com/r/{subreddit}/about.json"
    data = fetch(url)

    d = data["data"]
    print(f"\nℹ️  r/{subreddit} details\n")
    print(f"   Title:        {d['title']}")
    print(f"   Subscribers:  {d['subscribers']:,}")
    active = d.get("active_user_count")
    print(f"   Active users: {active:,}" if active else "   Active users: N/A")
    if d.get("public_description"):
        desc = (
            d["public_description"][:100] + "..."
            if len(d["public_description"]) > 100
            else d["public_description"]
        )
        print(f"   Description:  {desc}")


def cmd_top(args):
    """Get top posts."""
    if len(args) < 1:
        print("Usage: top <subreddit> [time]")
        print("Time options: hour, today, week, month, year, all")
        return

    subreddit = args[0]
    time = args[1] if len(args) > 1 else "week"

    url = f"https://www.reddit.com/r/{subreddit}/top.json"
    data = fetch(url, {"t": time, "limit": 10})

    print(f"\n🏆 r/{subreddit} - TOP posts (past {time})\n")
    for i, post in enumerate(data["data"]["children"][:10], 1):
        print(f"{i}.", format_post(post))


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        return

    command = sys.argv[1].lower()
    args = sys.argv[2:]

    commands = {
        "browse": cmd_browse,
        "search": cmd_search,
        "comments": cmd_comments,
        "details": cmd_details,
        "top": cmd_top,
    }

    if command in commands:
        commands[command](args)
    else:
        print(f"Unknown command: {command}")
        print("Available commands: browse, search, comments, details, top")


if __name__ == "__main__":
    main()
