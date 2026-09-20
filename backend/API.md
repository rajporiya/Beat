# Beat Music API

All new endpoints use the `/api/v1` prefix and return `{ success, message, data }`. Send the JWT returned by login as `Authorization: Bearer <token>`, or use the HTTP-only login cookie.

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/health` | Public | Health check |
| POST | `/auth/register` | Public | Body: `name`, `email`, `password`, `confirmPassword` |
| POST | `/auth/login` | Public | Body: `email`, `password` |
| POST | `/auth/logout` | Public | Clears cookie |
| GET | `/auth/me` | Authenticated | Current user |
| GET | `/songs?page=1&limit=20&q=&artist=&albumId=&genre=` | Public | Paginated song search |
| GET/POST/PATCH/DELETE | `/songs/:id` | Read public; writes admin | Song CRUD |
| POST | `/songs/:id/play` | Authenticated | Records a play and history |
| POST/DELETE/GET | `/songs/:id/like` | Authenticated | Like management/status |
| GET | `/search?q=` | Public | Songs, artists, albums, playlists |
| GET | `/home` | Public | Home feed data |
| GET | `/albums`, `/albums/:id` | Public | Album catalog/detail |
| GET | `/artists`, `/artists/:id` | Public | Artist catalog/detail |
| POST/PATCH/DELETE | `/artists/:id`, `/albums/:id` | Admin | Catalog management |
| GET/POST | `/playlists`, `/playlists/:id` | Public reads / auth writes | Playlist catalog and creation |
| PATCH/DELETE | `/playlists/:id` | Owner/admin | Playlist changes |
| POST/DELETE | `/playlists/:id/songs` | Owner/admin | Add or remove songs |
| GET | `/library`, `/library/liked`, `/library/recently-played` | Authenticated | Personal library |
| POST/GET/DELETE | `/history/:songId`, `/history` | Authenticated | Listening history |
| POST | `/uploads/avatar|song|album-cover|artist-cover` | Admin | Multipart field: `file` (10 MB max) |

Example success response:

```json
{ "success": true, "message": "Songs fetched", "data": [], "pagination": { "page": 1, "limit": 20, "total": 0, "totalPages": 0 } }
```
