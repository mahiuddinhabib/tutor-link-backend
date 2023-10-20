# Tutor Link Backend

## Live Link: https://tutor-link-backend.vercel.app/

### Application Routes:

User
- api/v1/auth/signup (POST)
- api/v1/auth/signin (POST)
- api/v1/users (GET)
- api/v1/users/15893736-3ad7-4041-9155-8d67f4bfd406 (Single GET)
- api/v1/users/15893736-3ad7-4041-9155-8d67f4bfd406 (PATCH)
- api/v1/users/15893736-3ad7-4041-9155-8d67f4bfd406 (DELETE)
- api/v1/profile (GET)

Subject
- api/v1/subjects/create-subject (POST)
- api/v1/subjects (GET)
- api/v1/subjects/f2d1163b-8d79-4d65-83fe-f0705e9951ea (Single GET)
- api/v1/subjects/f2d1163b-8d79-4d65-83fe-f0705e9951ea (PATCH)
- api/v1/subjects/f2d1163b-8d79-4d65-83fe-f0705e9951ea (DELETE)

Services
- api/v1/services/create-book (POST)
- api/v1/services (GET)
- api/v1/services/:categoryId/subject (GET)
- api/v1/services/:id (GET)
- api/v1/services/:id (PATCH)
- api/v1/services/:id (DELETE)
