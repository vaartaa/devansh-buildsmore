# Devansh Buildsmore

A static website for Devansh Buildsmore construction services with contact form integration.

## Tech Stack

- React 19 with Create React App
- Tailwind CSS + Radix UI components
- Framer Motion for animations
- React Hook Form with Zod validation
- Web3Forms for contact form submissions (no backend needed!)

## Local Development Setup

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### 1. Clone the Repository

```bash
git clone <repository-url>
cd devansh-buildsmore
```

### 2. Get Web3Forms Access Key

1. Go to [web3forms.com](https://web3forms.com)
2. Sign up for free (no credit card required)
3. Create a new form and get your access key
4. You'll receive form submissions to your email

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```bash
# frontend/.env
REACT_APP_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

### 4. Install Dependencies & Start

```bash
cd frontend
yarn install
yarn start
```

The website will be available at `http://localhost:3000`

## Running Tests

```bash
cd frontend
yarn test
```

## Project Structure

```
devansh-buildsmore/
├── frontend/
│   ├── public/           # Static files
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── sections/ # Page sections (Hero, Contact, etc.)
│   │   │   └── ui/       # Reusable UI components
│   │   ├── data/         # Site content
│   │   └── App.js        # Main app component
│   └── package.json      # Dependencies
└── backend/              # (Legacy - no longer needed)
```

## Building for Production

```bash
cd frontend
yarn build
```

This creates an optimized production build in the `frontend/build` directory.

## Deployment Options

This is a static website - no backend server or database required! Choose any static hosting platform:

### Option 1: AWS S3 + CloudFront (Your Target)

**Cost:** ~$1-5/month (depending on traffic)

#### Step-by-Step AWS S3 Deployment

1. **Build the site:**
   ```bash
   cd frontend
   REACT_APP_WEB3FORMS_ACCESS_KEY=your-key yarn build
   ```

2. **Create S3 Bucket:**
   - Go to AWS S3 Console
   - Create a new bucket (e.g., `devansh-buildsmore-website`)
   - Uncheck "Block all public access"
   - Enable static website hosting

3. **Upload files:**
   ```bash
   aws s3 sync build/ s3://your-bucket-name --delete
   ```
   Or use the AWS Console to upload the `build` folder contents

4. **Configure Bucket Policy:**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::your-bucket-name/*"
       }
     ]
   }
   ```

5. **Optional - Add CloudFront CDN:**
   - Create CloudFront distribution
   - Set S3 bucket as origin
   - Add custom domain (if needed)
   - Enable HTTPS

6. **Access your site:**
   - S3 URL: `http://your-bucket-name.s3-website-region.amazonaws.com`
   - CloudFront URL: `https://xyz123.cloudfront.net`

### Option 2: Vercel (Easiest - FREE)

**Cost:** FREE forever

1. Push code to GitHub
2. Import to [Vercel](https://vercel.com)
3. Configure:
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`
4. Add environment variable: `REACT_APP_WEB3FORMS_ACCESS_KEY`
5. Deploy!

**Auto-deploys on every git push!**

### Option 3: Netlify (Also Easy - FREE)

**Cost:** FREE forever

1. Push code to GitHub
2. Import to [Netlify](https://netlify.com)
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `yarn build`
   - **Publish directory**: `frontend/build`
4. Add environment variable: `REACT_APP_WEB3FORMS_ACCESS_KEY`
5. Deploy!

### Option 4: GitHub Pages (FREE)

**Cost:** FREE

```bash
cd frontend
yarn add --dev gh-pages

# Add to package.json:
"homepage": "https://yourusername.github.io/repo-name",
"scripts": {
  "predeploy": "yarn build",
  "deploy": "gh-pages -d build"
}

# Deploy:
yarn deploy
```

### Option 5: Cloudflare Pages (FREE)

**Cost:** FREE with generous limits

Similar to Vercel/Netlify - connect GitHub and deploy.

## Deployment Comparison

| Platform | Cost | Setup Time | Custom Domain | HTTPS | Auto-Deploy |
|----------|------|------------|---------------|-------|-------------|
| **AWS S3** | $1-5/mo | 15 min | Yes (Route53) | Yes (CloudFront) | Manual |
| **Vercel** | FREE | 5 min | Yes | Yes | Yes |
| **Netlify** | FREE | 5 min | Yes | Yes | Yes |
| **GitHub Pages** | FREE | 10 min | Yes | Yes | Yes |
| **Cloudflare** | FREE | 5 min | Yes | Yes | Yes |

## Deployment Checklist

- [ ] Get Web3Forms access key from [web3forms.com](https://web3forms.com)
- [ ] Set `REACT_APP_WEB3FORMS_ACCESS_KEY` environment variable
- [ ] Build the production version: `yarn build`
- [ ] Upload to your chosen platform
- [ ] Test the contact form submission
- [ ] Configure custom domain (optional)
- [ ] Set up SSL/HTTPS (automatic on Vercel/Netlify/Cloudflare)

## Environment Variables

Only one environment variable needed:

- `REACT_APP_WEB3FORMS_ACCESS_KEY` - Your Web3Forms access key

**Important:** Never commit your access key to git! Add it through your hosting platform's dashboard.

## Migrating from Backend to Static Site

The `backend` folder in this repository is **no longer needed**. The site now uses Web3Forms for contact form submissions, eliminating the need for:
- Python/FastAPI backend server
- MongoDB database
- Backend hosting costs
- Complex deployment setup

You can safely delete the `backend` folder if you want to clean up the repository.

## Troubleshooting

### Contact form not working

- Check that `REACT_APP_WEB3FORMS_ACCESS_KEY` is set correctly
- Verify your Web3Forms account is active
- Check browser console for errors
- Make sure you're using a valid email in the Web3Forms dashboard

### Build errors

- Delete `node_modules` and `yarn.lock`
- Run `yarn install` again
- Make sure Node.js version is 16 or higher

### Port already in use

```bash
# Change the port
PORT=3001 yarn start
```
