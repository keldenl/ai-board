# Reddit JSON API Reference

Complete documentation of Reddit's JSON API structure and response formats.

## Table of Contents

1. [Post Data Structure](#post-data-structure)
2. [Comment Data Structure](#comment-data-structure)
3. [Subreddit Data Structure](#subreddit-data-structure)
4. [Listing Response Structure](#listing-response-structure)
5. [API Endpoints](#api-endpoints)

## Post Data Structure

When fetching posts (from subreddit feeds, search, etc.), each post has this structure:

```json
{
  "kind": "t3",
  "data": {
    "approved_at_utc": null,
    "subreddit": "aww",
    "selftext": "",
    "author_fullname": "t2_27laik1kaq",
    "saved": false,
    "mod_reason_title": null,
    "gilded": 0,
    "clicked": false,
    "title": "Coco has no idea what's going on...",
    "link_flair_richtext": [],
    "subreddit_name_prefixed": "r/aww",
    "hidden": false,
    "pwls": 6,
    "link_flair_css_class": "lc",
    "downs": 0,
    "thumbnail_height": 137,
    "top_awarded_type": null,
    "hide_score": false,
    "name": "t3_1regac2",
    "quarantine": false,
    "link_flair_text_color": null,
    "upvote_ratio": 0.98,
    "author_flair_background_color": null,
    "subreddit_type": "public",
    "ups": 23237,
    "total_awards_received": 0,
    "media_embed": {},
    "thumbnail_width": 140,
    "author_flair_template_id": null,
    "is_original_content": true,
    "user_reports": [],
    "secure_media": null,
    "is_reddit_media_domain": true,
    "is_meta": false,
    "category": null,
    "secure_media_embed": {},
    "link_flair_text": null,
    "can_mod_post": false,
    "score": 23237,
    "approved_by": null,
    "is_created_from_ads_ui": false,
    "author_premium": false,
    "thumbnail": "https://preview.redd.it/...",
    "edited": false,
    "author_flair_css_class": null,
    "author_flair_richtext": [],
    "author_patreon_flair": false,
    "body_html": "...",
    "gildings": {},
    "collapsed_reason_code": null,
    "distinguished": null,
    "associated_award": null,
    "stickied": false,
    "author_premium": false,
    "can_gild": false,
    "url": "https://i.redd.it/...",
    "domain": "i.redd.it",
    "subreddit_id": "t5_qh06e",
    "is_self": false,
    "link_flair_type": null,
    "wls": 6,
    "removed_by_category": null,
    "banned_by": null,
    "author_flair_type": "text",
    "thumbnail_height": 137,
    "total_awards_received": 0,
    "media_embed": {},
    "secure_media": null,
    "is_original_content": true,
    "author_fullname": "t2_27laik1kaq",
    "link_flair_text": null,
    "author": "Grouchy-Fig7242",
    "num_comments": 116,
    "permalink": "/r/aww/comments/1regac2/coco_has_no_idea...",
    "created_utc": 1772033322.0,
    "id": "1regac2",
    "over_18": false,
    "spoiler": false,
    "locked": false,
    "author_flair_background_color": null,
    "link_flair_text_color": null,
    "view_count": null,
    "is_video": false
  }
}
```

### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Short post ID (used in URLs) |
| `title` | string | Post title |
| `author` | string | Username of the poster |
| `subreddit` | string | Subreddit name |
| `subreddit_name_prefixed` | string | Full subreddit name with r/ prefix |
| `ups` | int | Number of upvotes |
| `downs` | int | Number of downvotes |
| `score` | int | Net score (ups - downs) |
| `upvote_ratio` | float | Ratio of upvotes (0.0-1.0) |
| `num_comments` | int | Number of comments |
| `created_utc` | float | Unix timestamp of creation |
| `permalink` | string | Full path to the post |
| `url` | string | Link URL (external or Reddit media) |
| `thumbnail` | string | Image thumbnail URL |
| `selftext` | string | Text content of self-post |
| `is_self` | bool | Whether this is a self-post (text-only) |
| `is_original_content` | bool | Whether post is marked as original content |
| `is_reddit_media_domain` | bool | Whether image is hosted on Reddit |
| `link_flair_text` | string or null | Post flair text (if any) |
| `gilded` | int | Number of gold awards |
| `total_awards_received` | int | Total awards of all types |
| `distinguished` | string or null | "mod" or "admin" if distinguished, null otherwise |
| `stickied` | bool | Whether post is stickied |
| `locked` | bool | Whether comments are locked |
| `spoiler` | bool | Whether post is marked as spoiler |
| `over_18` | bool | Whether post is NSFW |
| `edited` | bool | Whether post has been edited |
| `author_premium` | bool | Whether author is a Reddit premium user |
| `quarantine` | bool | Whether post is in a quarantined subreddit |

## Comment Data Structure

Comments have this structure:

```json
{
  "kind": "t1",
  "data": {
    "subreddit_id": "t5_qh06e",
    "approved_at_utc": null,
    "author_is_blocked": false,
    "comment_type": null,
    "link_title": "Coco has no idea...",
    "mod_reason_by": null,
    "banned_by": null,
    "ups": 1,
    "num_reports": null,
    "author_flair_type": "text",
    "total_awards_received": 0,
    "subreddit": "aww",
    "link_author": "Grouchy-Fig7242",
    "likes": null,
    "replies": "",
    "user_reports": [],
    "saved": false,
    "id": "c0rduey",
    "banned_at_utc": null,
    "mod_reason_title": null,
    "gilded": 0,
    "archived": true,
    "collapsed_reason_code": null,
    "no_follow": true,
    "author": "SIMSPON",
    "num_comments": 1,
    "can_mod_post": false,
    "send_replies": true,
    "parent_id": "t3_cbbyy",
    "score": 1,
    "author_fullname": "t2_43kr1",
    "over_18": false,
    "report_reasons": null,
    "removal_reason": null,
    "approved_by": null,
    "controversiality": 0,
    "body": "GAMES AND MISC",
    "edited": false,
    "top_awarded_type": null,
    "downs": 0,
    "author_flair_css_class": null,
    "is_submitter": true,
    "collapsed": false,
    "author_flair_richtext": [],
    "author_patreon_flair": false,
    "body_html": "<div class=\"md\"><p>GAMES AND MISC</p></div>",
    "gildings": {},
    "collapsed_reason": null,
    "distinguished": null,
    "associated_award": null,
    "stickied": false,
    "author_premium": false,
    "can_gild": false,
    "created_utc": 1234567890.0,
    "name": "c0rduey",
    "link_id": "t3_cbbyy",
    "replies": "",
    "subreddit": "reddit.com"
  }
}
```

### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Comment ID |
| `author` | string | Username of the commenter |
| `body` | string | Comment text (plain) |
| `body_html` | string | Comment text (HTML) |
| `score` | int | Comment score |
| `ups` | int | Number of upvotes |
| `downs` | int | Number of downvotes |
| `created_utc` | float | Unix timestamp of creation |
| `permalink` | string | Full path to the comment |
| `subreddit` | string | Subreddit |
| `gilded` | int | Number of gold awards |
| `total_awards_received` | int | Total awards |
| `distinguished` | string or null | "mod" or "admin" if distinguished |
| `edited` | bool | Whether comment was edited |
| `archived` | bool | Whether thread/comment is archived |
| `collapsed` | bool | Whether comment is collapsed |
| `stickied` | bool | Whether comment is stickied |
| `author_premium` | bool | Whether author is premium |
| `controversiality` | int | 1 if controversial, 0 otherwise |
| `no_follow` | bool | Whether replies are disabled |
| `send_replies` | bool | Whether OP can receive replies |

## Subreddit Data Structure

Subreddit info endpoints return:

```json
{
  "kind": "Subreddit",
  "data": {
    "display_name": "technology",
    "display_name_prefixed": "r/technology",
    "title": "/r/Technology",
    "public_description": "Subreddit dedicated to the news and discussions about the creation and use of technology and its surrounding issues.",
    "url": "/r/technology/",
    "subreddit_type": "public",
    "subreddit_id": "t5_2qh1i",
    "icon_img": "https://styles.redditmedia.com/t5_2qh1i/styles/communityIcon_...",
    "header_img": null,
    "banner_img": "https://styles.redditmedia.com/t5_2qh1i/styles/bannerImage_...",
    "over18": false,
    "icon_color": "#0079D3",
    "banner_color": null,
    "created_utc": 1201242300.0,
    "subscribers": 20154261,
    "active_user_count": 15432,
    "accounts_active": 15432
  }
}
```

### Key Fields

| Field | Type | Description |
|-------|------|-------------|
| `display_name` | string | Subreddit name (without r/) |
| `display_name_prefixed` | string | Full subreddit name with r/ prefix |
| `title` | string | Subreddit display title |
| `public_description` | string | Subreddit description |
| `subscribers` | int | Number of subscribers |
| `active_user_count` | int | Currently active users |
| `accounts_active` | int | Same as active_user_count |
| `over18` | bool | Whether subreddit is NSFW |
| `subreddit_type` | string | "public", "restricted", or "private" |
| `created_utc` | float | When subreddit was created |
| `icon_img` | string | Community icon URL |
| `banner_img` | string | Banner image URL |
| `header_img` | string | Header image URL |

## Listing Response Structure

All feed endpoints (subreddit posts, search results, etc.) return a listing:

```json
{
  "kind": "Listing",
  "data": {
    "modhash": "la6xmexs8u301d6d105d24f94cdaa4457a00a1ea042c95f6e2",
    "dist": 25,
    "after": "t3_1rf5001",
    "before": null,
    "geo_filter": "",
    "children": [
      {
        "kind": "t3",
        "data": { /* post data */ }
      }
    ]
  }
}
```

### Listing Fields

| Field | Type | Description |
|-------|------|-------------|
| `kind` | string | Type of listing response |
| `modhash` | string | Authentication token (for authenticated requests) |
| `dist` | int | Number of results returned |
| `after` | string | Pagination token for next page |
| `before` | string | Pagination token for previous page |
| `geo_filter` | string | Geographic filter (if any) |
| `children` | array | Array of post/comment objects |

### Pagination

To paginate through results:

1. First request: `https://www.reddit.com/r/aww/new.json?limit=25`
2. Check response for `after` value
3. Next request: `https://www.reddit.com/r/aww/new.json?after={after_value}&limit=25`
4. Repeat until `after` is null

## API Endpoints

### Subreddit Feeds

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/r/{subreddit}/new.json` | Newest posts |
| `https://www.reddit.com/r/{subreddit}/hot.json` | Hot/trending posts |
| `https://www.reddit.com/r/{subreddit}/top.json?t={time}` | Top posts (time filter required) |
| `https://www.reddit.com/r/{subreddit}/rising.json` | Rising posts |
| `https://www.reddit.com/r/{subreddit}/controversial.json?t={time}` | Controversial posts |

### Multi-Subreddit Feeds

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/r/all/new.json` | Newest from all subreddits |
| `https://www.reddit.com/r/all/hot.json` | Hot from all subreddits |
| `https://www.reddit.com/r/popular.json` | Popular posts |

### Domain Search

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/domain/{domain}/new.json` | Posts linking to domain |
| `https://www.reddit.com/domain/{domain}/hot.json` | Hot posts linking to domain |

### Search

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/search.json?q={query}` | Search all of Reddit |
| `https://www.reddit.com/r/{subreddit}/search.json?q={query}` | Search within subreddit |

### Specific Posts

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/r/{subreddit}/comments/{id}/.json` | Get specific post |
| `https://www.reddit.com/comments/{id}/.json` | Get specific post by ID |

### Comments

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/r/{subreddit}/comments/{id}/comments.json` | Get comments for post |

### Subreddit Info

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/r/{subreddit}/about.json` | Subreddit details |
| `https://www.reddit.com/r/{subreddit}/contributors.json` | Subreddit moderators |
| `https://www.reddit.com/r/{subreddit}/wiki/index.json` | Subreddit wiki page |

### User

| Endpoint | Description |
|----------|-------------|
| `https://www.reddit.com/user/{username}.json` | User's submissions |
| `https://www.reddit.com/user/{username}/submitted.json` | User's submitted posts |
| `https://www.reddit.com/user/{username}/comments.json` | User's comments |

## Query Parameters

### Common Parameters

| Parameter | Description |
|-----------|-------------|
| `limit={n}` | Number of results (default: varies, max: 100) |
| `after={token}` | Pagination token for next page |
| `before={token}` | Pagination token for previous page |
| `sort={type}` | Sort order (new, hot, top, rising, controversial) |
| `t={time}` | Time filter for top/controversial (hour, today, week, month, year, all) |
| `show={type}` | Show hidden posts, deleted posts, etc. |

### Search Parameters

| Parameter | Description |
|-----------|-------------|
| `q={query}` | Search query |
| `restrict_sr=true` | Search only within subreddit |
| `sort={type}` | Sort by relevance, hot, new, top, or controversial |
| `t={time}` | Time filter for top sorting |
| `limit={n}` | Limit results |

## Python Helper Functions

```python
import requests
import json

REDDIT_USER_AGENT = 'kai/reddit-explorer'

def fetch_reddit_json(url, params=None):
    """Fetch Reddit JSON with proper headers."""
    headers = {'User-Agent': REDDIT_USER_AGENT}
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

def get_subreddit_posts(subreddit, sort='hot', limit=25):
    """Get posts from a subreddit."""
    url = f'https://www.reddit.com/r/{subreddit}/{sort}.json'
    params = {'limit': limit}
    return fetch_reddit_json(url, params)

def get_post_comments(subreddit, post_id):
    """Get comments for a specific post."""
    url = f'https://www.reddit.com/r/{subreddit}/comments/{post_id}/comments.json'
    return fetch_reddit_json(url)

def search_reddit(query, sort='hot', limit=10):
    """Search Reddit."""
    url = 'https://www.reddit.com/search.json'
    params = {'q': query, 'sort': sort, 'limit': limit}
    return fetch_reddit_json(url, params)

def paginate_posts(subreddit, sort='hot', after=None, limit=25):
    """Paginate through subreddit posts."""
    url = f'https://www.reddit.com/r/{subreddit}/{sort}.json'
    params = {'limit': limit}
    if after:
        params['after'] = after
    return fetch_reddit_json(url, params)
```

## Notes

- All timestamps are in Unix UTC format (seconds since epoch)
- Reddit's JSON API is unofficial but stable
- Rate limiting is based on User-Agent
- Some endpoints may require authentication for full functionality
- The API may change; this documentation is based on current behavior