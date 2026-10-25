# Beyond Shopping: Understanding Cloud Computing with AWS

A complete, interactive, browser-based presentation for a college-level introductory session on Cloud Computing and Amazon Web Services (AWS). Designed for 6–7 speakers presenting to a mixed audience with no assumed technical background.

---

## How to Open and Run

1. Open the file `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).
2. No server, build tool, or internet connection is required for core functionality.
3. External source links (AWS documentation, Amazon investor relations) open in a new tab and require an internet connection.

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| `→` / `Space` | Next slide |
| `←` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |
| `O` | Toggle slide overview grid |
| `N` | Toggle presenter notes panel |
| `F` | Toggle fullscreen mode |
| `Esc` | Close any open panel or exit fullscreen |

On-screen buttons are also available in the top and bottom navigation bars.

---

## File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | All 38 slide definitions, structure, and layout. Edit slide content here. |
| `style.css` | All visual styles — colors, typography, animations, responsive layout. |
| `script.js` | Navigation, interactive demos, animations, notes, and UI logic. |
| `README.md` | This documentation file. |

---

## Speaker Assignments

The presentation is divided into 7 sections for 7 speakers. If only 6 speakers are available, combine Speakers 6 and 7.

| Speaker | Slides | Topics | Approx. Time |
|---------|--------|--------|--------------|
| Speaker 1 | 1–4 | Title, Amazon quiz, Business segments, Big question | ~8 min |
| Speaker 2 | 5–10 | Movie analogy, Cloud definition, Servers, On-premises vs. cloud | ~13 min |
| Speaker 3 | 11–16 | Cloud evolution, AWS history, Hosting problem, Scalability intro, AWS overview, EC2 + S3 intro | ~12 min |
| Speaker 4 | 17–22 | EC2 deep dive, Virtual machines, VM architecture, Instance sizing, Security groups | ~12 min |
| Speaker 5 | 23–26 | Scaling demo, Vertical scaling, Horizontal scaling, Comparison | ~10 min |
| Speaker 6 | 27–32 | S3 intro, EC2 vs S3, Versioning, Storage classes, Glacier, Decision helper | ~15 min |
| Speaker 7 | 33–38 | Hands-on setup, Safety, Demo procedure, Troubleshooting, Recap, Q&A | ~20 min |

**For 6 speakers:** Speaker 6 covers slides 27–38, taking over Speaker 7's hands-on demonstration duties.

---

## How to Update Names and College Details

Open `index.html` in a text editor and find Slide 1 (near the top, `id="slide-1"`).

**Presenter names:** Look for the `<span class="presenter-chip" contenteditable="true">` elements. Replace the placeholder text between the tags with real names. They are also editable by clicking directly in the browser during the presentation.

**Department and College:** Look for the `<span contenteditable="true">Department Name</span>` and `<span contenteditable="true">Your College / University</span>` tags. Edit the text between them.

Example:
```html
<span class="presenter-chip" contenteditable="true">Aditya Kumar</span>
<span contenteditable="true">Computer Science Engineering</span>
<span contenteditable="true">ABC Institute of Technology</span>
```

---

## How to Edit Slide Content

1. Open `index.html` in a text editor (VS Code recommended).
2. Find the slide by searching for `id="slide-N"` where N is the slide number (1–38).
3. Edit the HTML between the `<section class="slide">` tags.
4. Keep the same CSS classes to maintain styling.

To change colors or fonts globally, edit the CSS variables at the top of `style.css` under `:root { }`.

---

## How to Conduct the S3 Hands-On Demonstration Safely

### Before the Session

- Ensure you have access to an authorized AWS account (instructor account or classroom sandbox).
- Confirm the account has IAM permissions for S3: `s3:CreateBucket`, `s3:PutObject`, `s3:GetObject`, `s3:PutBucketVersioning`.
- Prepare a small sample file (a plain .txt file or small image, under 1 MB).
- Never use a personal production account. Never use the root account.
- Test the steps once before the live session.

### During the Session

Follow the steps on **Slide 35** exactly. Key safety rules:

- **Block Public Access: Keep enabled.** Do not disable any of the four Block Public Access settings.
- **Do not create bucket policies** that allow public access.
- **Do not upload** passwords, API keys, personal documents, or sensitive data.
- **Bucket name must be unique** across all AWS accounts — add a unique suffix (e.g., your initials + today's date).

### After the Session

1. Go to the S3 bucket in the AWS Console.
2. If versioning is enabled: delete all versions of each object (select all → Actions → Delete).
3. If versioning is not enabled: select all objects → Delete.
4. Once the bucket is empty, select the bucket → Delete bucket.
5. Type the bucket name to confirm deletion.
6. Check the billing dashboard to confirm no unexpected charges.

### Free Tier Note

As of this writing, AWS Free Tier includes 5 GB of S3 Standard storage and 20,000 GET requests per month for new accounts in their first 12 months. Eligibility and limits may change. This is not a guarantee that all actions are free. Always verify with the [AWS Free Tier page](https://aws.amazon.com/free/).

---

## Interactive Features

| Slide | Feature |
|-------|---------|
| 2 | Click-to-reveal Amazon business options |
| 3 | Animated bar chart: AWS vs. other segments |
| 6 | File-transfer animation (packet animation) |
| 19 | Progressive VM architecture reveal (click "Reveal Next Layer") |
| 23 | Traffic slider — see server state change |
| 24 | Click server to vertically scale it |
| 25 | Click "+ Add Instance" for horizontal scaling |
| 29 | S3 versioning simulation — click versions, simulate upload |
| 30 | Click storage tier rows to see detailed info |
| 32 | Interactive storage class decision helper |
| 33 | Clickable hands-on checklist with progress tracking |

---

## Sources

All technical claims and financial figures are based on official sources:

| Topic | Source |
|-------|--------|
| Amazon Full Year 2024 Financial Results | [Amazon Q4 2024 Earnings Release, Feb 6 2025](https://ir.aboutamazon.com/news-release/news-release-details/2025/Amazon-com-Announces-Fourth-Quarter-Results/default.aspx) |
| AWS History and Origins | [AWS Our Origins](https://aws.amazon.com/id/about-aws/our-origins/) |
| Amazon S3 Launch (March 14, 2006) | [AWS Blog: Twenty Years of Amazon S3](https://aws.amazon.com/blogs/aws/twenty-years-of-amazon-s3-and-building-whats-next) |
| Amazon EC2 Launch (August 2006 beta) | [Wikipedia: Amazon EC2 Timeline](https://en.wikipedia.org/wiki/Amazon_Elastic_Compute_Cloud) |
| EC2 Documentation | [aws.amazon.com/ec2](https://aws.amazon.com/ec2/) |
| EC2 Security Groups | [AWS Docs: EC2 Security Groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-security-groups.html) |
| S3 Documentation | [aws.amazon.com/s3](https://aws.amazon.com/s3/) |
| S3 Storage Classes | [aws.amazon.com/s3/storage-classes](https://aws.amazon.com/s3/storage-classes/) |
| S3 Versioning | [AWS Docs: S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html) |
| S3 Glacier Storage Classes | [AWS Docs: Glacier Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html) |
| Cloud Computing Definition | [aws.amazon.com/what-is-cloud-computing](https://aws.amazon.com/what-is-cloud-computing/) |

### Key Financial Data (Full Year 2024, Verified)

Source: Amazon Q4 2024 Earnings Release, February 6, 2025

| Segment | Net Sales | Operating Income | Op. Margin |
|---------|-----------|-----------------|------------|
| North America | $387.5B | $25.0B | ~6.4% |
| International | $142.9B | $3.8B | ~2.7% |
| AWS | $107.6B | $39.8B | ~37% |
| **Total** | **$638.0B** | **$68.6B** | **~10.8%** |

**AWS = 17% of total net sales, ~58% of total operating income (2024)**

AWS is not the largest segment by revenue — North America retail is. AWS is however the highest-margin segment, contributing disproportionately to operating profit.

---

## Technical Notes

- Built with HTML5, CSS3, and vanilla JavaScript. No frameworks or build tools required.
- Slides maintain a 16:9 aspect ratio and scale to fill the available viewport.
- Animations respect `prefers-reduced-motion` — users with reduced-motion preferences see no transitions.
- All interactive elements have keyboard accessibility (Tab + Enter/Space).
- Color contrast meets WCAG AA standards for text readability.
- Presenter notes are accessible via the Notes button or `N` key.
- Slide content is fully editable in `index.html` — no JavaScript knowledge required for text updates.

---

*Presentation prepared for educational purposes. AWS, Amazon, EC2, and S3 are trademarks of Amazon.com, Inc.*
