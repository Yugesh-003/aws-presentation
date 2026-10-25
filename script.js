/**
 * AWS Cloud Computing Presentation — script.js
 * Handles navigation, interactions, animations, and UI
 */

/* ── State ─────────────────────────────────────────────── */
const state = {
  current: 1,
  total: 38,
  notesOpen: false,
  overviewOpen: false,
  vmLayerStep: 0,
  vScaleLevel: 0,
  hScaleCount: 1,
  decisionAnswers: {},
  s3Uploads: 0,
  tierInfoData: null,
  barsAnimated: {},
};

/* ── Slide metadata ────────────────────────────────────── */
const SLIDES = Array.from(document.querySelectorAll('.slide'));

/* ── Presenter Notes ───────────────────────────────────── */
const NOTES = {
  1: `<strong>Speaker 1 · ~2 min</strong><br><em>Opener</em><br><br>
Welcome everyone! Today we're going to take you on a journey — from online shopping to the technology that powers the internet itself. <br><br>
<strong>Key takeaway:</strong> Amazon is far more than an online store.<br><br>
👉 Ask the audience: "How many of you use Amazon for shopping?" Then: "How many have heard of Amazon Web Services?"<br><br>
<strong>Transition:</strong> Let's find out what else comes to mind when you hear the word Amazon.`,

  2: `<strong>Speaker 1 · ~2 min</strong><br><em>Audience Engagement</em><br><br>
Click each card to reveal the options. Wait for audience reactions. Pause on the AWS card and ask: "Surprised? This cloud division is one of the biggest tech businesses on Earth."<br><br>
<strong>Key takeaway:</strong> AWS powers huge portions of the internet — Netflix, NASA, Airbnb, and millions more all run on AWS.<br><br>
<strong>Transition:</strong> But how does Amazon make money? Let's look at the numbers.`,

  3: `<strong>Speaker 1 · ~3 min</strong><br><em>Business Overview — Q2 2026 Verified Data</em><br><br>
The bars animate when you arrive on this slide. Walk the audience through each segment. The left panel shows operating income detail cards; the right panel shows the bar charts.<br><br>
<strong>Key numbers (Q2 2026):</strong><br>
• AWS: Revenue $42.232B, Op. Income $16.621B, Margin <strong>39.4%</strong><br>
• North America: Revenue $116.177B, Op. Income $9.123B, Margin 7.9%<br>
• International: Revenue $42.197B, Op. Income $1.717B, Margin 4.1%<br><br>
<strong>Critical accuracy point:</strong> AWS revenue (~$42B) is roughly equal to International revenue (~$42B) in Q2 2026, but AWS operating income ($16.6B) is nearly <em>10×</em> that of International ($1.7B). AWS contributes ~59% of total operating income despite being ~21% of total revenue.<br><br>
<strong>Don't say:</strong> "AWS is Amazon's biggest revenue earner" — North America retail is still larger by revenue. AWS is the most <em>profitable</em> segment per dollar earned.<br><br>
<strong>Key takeaway:</strong> Cloud services can be extremely high-margin businesses. AWS margin is 39.4% vs. North America retail at 7.9%.<br><br>
<strong>Transition:</strong> This leads to a big question — why would a retailer build computing infrastructure?`,

  4: `<strong>Speaker 1 · ~1 min</strong><br><em>Transition Slide</em><br><br>
This is a pause-and-wonder moment. Let the question sink in. Brief, impactful.<br><br>
<strong>Say:</strong> "We're going to answer this by starting from absolute basics. What even is a computer server?"<br><br>
<strong>Transition to Speaker 2:</strong> "I'll hand it over to [Speaker 2's name] who will take us through the fundamentals of cloud computing — starting with a very relatable problem you might have faced yourself."`,

  5: `<strong>Speaker 2 · ~2 min</strong><br><em>Relatable Problem</em><br><br>
Start casual: "Has your phone ever shown 'Storage Full' right when you wanted to take a photo?"<br><br>
Build the scenario: 1 GB movie, nowhere to put it, expensive hardware, etc.<br><br>
<strong>Key takeaway:</strong> Data storage is a real problem everyone faces. Cloud computing offers a solution.<br><br>
<strong>Transition:</strong> Let me show you a simple way to think about this...`,

  6: `<strong>Speaker 2 · ~3 min</strong><br><em>Analogy Slide</em><br><br>
Walk through the 5 steps. The animated arrow shows file transfer. Point out that this is a simplified analogy — real cloud is more complex, professional, and secure.<br><br>
<strong>Important:</strong> Clarify that actual cloud pricing depends on service, usage, capacity, and other factors. The ₹10 example is a simplified illustration only.<br><br>
<strong>Key takeaway:</strong> Cloud computing is conceptually similar to renting storage/compute from someone else — but at massive, professional scale.<br><br>
<strong>Transition:</strong> Now let's see what that "friend's computer" looks like at professional scale.`,

  7: `<strong>Speaker 2 · ~2 min</strong><br><em>Cloud Definition</em><br><br>
Give the definition clearly, then tie it back to the analogy. The diagram shows the path from laptop → internet → AWS → app.<br><br>
Introduce pay-as-you-go: "Just like you'd pay per minute for a phone call, you pay per hour (or second) for compute time."<br><br>
<strong>Key takeaway:</strong> Cloud = on-demand resources over internet, pay for what you use.<br><br>
<strong>Transition:</strong> But before we go further, let's understand what a "server" actually is.`,

  8: `<strong>Speaker 2 · ~2 min</strong><br><em>Server Concept</em><br><br>
The restaurant analogy works really well here. Walk through it role by role. Emphasize: a server is not a special-looking machine — it's any computer with the right software configured to serve requests.<br><br>
<strong>Key takeaway:</strong> A server is a computer that provides services to other computers.<br><br>
<strong>Transition:</strong> Now, before cloud computing existed, companies managed their own servers. Let's see what that looked like.`,

  9: `<strong>Speaker 2 · ~2 min</strong><br><em>On-Premises Concept</em><br><br>
Describe the server room visual. Ask: "Imagine your college had to manage all the technology for its online portal — servers, cooling, security, power. That's on-premises."<br><br>
Important: Mention that on-premises is still appropriate for many organizations — not everything belongs in the cloud.<br><br>
<strong>Key takeaway:</strong> On-premises = own your hardware, manage everything yourself, total control.<br><br>
<strong>Transition:</strong> Let's compare this directly with cloud computing.`,

  10: `<strong>Speaker 2 · ~2 min</strong><br><em>Comparison Table</em><br><br>
Walk through each row. Avoid making it sound like "cloud is always better." Emphasize that the right choice depends on the organization's needs.<br><br>
Many large enterprises use both — a "hybrid" approach.<br><br>
<strong>Key takeaway:</strong> Cloud and on-premises each have tradeoffs. The best choice depends on requirements.<br><br>
<strong>Transition to Speaker 3:</strong> "I'll hand over to [Speaker 3] who will tell us how all of this evolved — including how Amazon went from being a bookstore to running the internet."`,

  11: `<strong>Speaker 3 · ~2 min</strong><br><em>Historical Context</em><br><br>
Start with: "Imagine you buy a powerful gaming PC specifically to run a game that's popular only during one weekend a year. The rest of the time, it just sits there."<br><br>
That's exactly what many companies faced with servers — expensive hardware, low utilization most of the time.<br><br>
<strong>Key takeaway:</strong> Underutilized hardware is expensive and wasteful. This inefficiency drove the search for a better model.<br><br>
<strong>Transition:</strong> This is part of the context in which AWS emerged.`,

  12: `<strong>Speaker 3 · ~3 min</strong><br><em>AWS History — Verified</em><br><br>
Walk through the timeline. Key dates: S3 launched March 14, 2006. EC2 beta August 2006, GA October 2008.<br><br>
<strong>Important nuance:</strong> Don't say Amazon had "spare servers and rented them out." The reality is Amazon built reusable infrastructure capabilities for its retail business, then systematically offered those capabilities as services.<br><br>
<strong>Key takeaway:</strong> AWS grew from Amazon's internal infrastructure capabilities into a deliberate cloud services business.<br><br>
<strong>Transition:</strong> Why did this become so important? Let me tell you about a student's website...`,

  13: `<strong>Speaker 3 · ~2 min</strong><br><em>Hosting Problem</em><br><br>
This is very relatable — many students have tried to share a web project. Walk through the 5 steps. Show how EC2 solves the "my laptop is not always on" problem.<br><br>
<strong>Key takeaway:</strong> Cloud hosting makes your application available 24/7 to anyone, anywhere, without owning a server.<br><br>
<strong>Transition:</strong> But what happens when that website becomes really popular?`,

  14: `<strong>Speaker 3 · ~2 min</strong><br><em>Scalability Intro</em><br><br>
Walk through the four visitor levels, building the drama. Let the audience feel the progression from "fine" to "crashed."<br><br>
Emphasize: this is a conceptual illustration. Real capacity depends on app design and server spec.<br><br>
<strong>Key takeaway:</strong> Scalability = ability to handle more load. Cloud makes scaling faster and more flexible.<br><br>
<strong>Transition:</strong> "Now I'll hand over to [Speaker 3/4] who will explain EC2 and virtual machines in detail."`,

  15: `<strong>Speaker 3 · ~2 min</strong><br><em>AWS Overview</em><br><br>
The diagram shows the flow: user → internet → AWS → services → app. Keep it simple.<br><br>
AWS has 200+ services but we're focusing on 2 today: EC2 and S3. Mention a few others briefly (RDS for databases, AI/ML services) to show breadth.<br><br>
<strong>Key takeaway:</strong> AWS is a huge menu of cloud services. Today we'll try just two items.<br><br>
<strong>Transition:</strong> Let's introduce those two services before diving deep.`,

  16: `<strong>Speaker 3 · ~2 min</strong><br><em>EC2 and S3 Intro</em><br><br>
The two cards introduce EC2 (compute) and S3 (storage) at a high level. Use the simple analogy clearly.<br><br>
<strong>Key takeaway:</strong> EC2 = where your code runs. S3 = where your files live. Together they power most web applications.<br><br>
<strong>Transition to Speaker 4:</strong> "[Speaker 4] will now take us deep into EC2 — how virtual machines work, and how to choose the right instance for your needs."`,

  17: `<strong>Speaker 4 · ~2 min</strong><br><em>EC2 Introduction</em><br><br>
Explain each key term clearly. Use your phone analogy: "vCPU is like the processor chip in your phone. RAM is like your phone's working memory when apps are running. Storage is like your phone's internal memory where photos are saved."<br><br>
<strong>Key takeaway:</strong> EC2 gives you a virtual computer in the cloud, configurable to your needs.<br><br>
<strong>Transition:</strong> But what does "virtual" mean? Let's understand virtual machines.`,

  18: `<strong>Speaker 4 · ~2 min</strong><br><em>Virtual Machine Concept</em><br><br>
The building/apartment analogy is very powerful here. Draw it out verbally: "One physical building, multiple independent apartments. Each apartment has its own family, its own stuff, and they don't interfere with each other — even though they share the same building structure."<br><br>
<strong>Key takeaway:</strong> A VM is a software computer running inside a real computer, isolated from other VMs.<br><br>
<strong>Transition:</strong> Let me show you the actual architecture.`,

  19: `<strong>Speaker 4 · ~3 min</strong><br><em>VM Architecture — Interactive</em><br><br>
Use "Reveal Next Layer" to progressively show the diagram. Click each layer and explain it.<br><br>
Hardware → Hypervisor → VMs. Mention Type 1 vs Type 2 briefly. Clarify AWS uses its Nitro System — custom virtualization at scale.<br><br>
<strong>Key takeaway:</strong> Hypervisor = the software that creates and manages VMs. EC2 uses AWS's virtualization stack so you only manage the virtual layer.<br><br>
<strong>Transition:</strong> Let's connect this to how you actually use EC2.`,

  20: `<strong>Speaker 4 · ~2 min</strong><br><em>EC2 Launch Configuration</em><br><br>
Walk through the 4 steps. Emphasize AMI: "It's like choosing a pre-installed template. You pick Ubuntu Linux AMI and your instance starts with Ubuntu already installed."<br><br>
<strong>Key takeaway:</strong> To launch an EC2 instance, choose an AMI, instance type, storage, and security configuration.<br><br>
<strong>Transition:</strong> How do you choose the right size?`,

  21: `<strong>Speaker 4 · ~2 min</strong><br><em>Instance Sizing</em><br><br>
The three tiers from small to compute-heavy. Emphasize these are illustrative examples — real sizing requires understanding your workload.<br><br>
Mention: Always start small and scale up based on actual usage data, not guesses.<br><br>
<strong>Key takeaway:</strong> Match instance size to workload. EC2 has many families for different needs.<br><br>
<strong>Transition:</strong> Once your instance is running, how do you keep it secure?`,

  22: `<strong>Speaker 4 · ~3 min</strong><br><em>Security Groups — Important</em><br><br>
Walk through the security group diagram carefully. Emphasize the house analogy clearly.<br><br>
Critical point: Never open SSH/RDP to 0.0.0.0/0 (the whole internet). Restrict admin access to your specific IP. This is a very common security mistake.<br><br>
<strong>Key takeaway:</strong> Security groups are your virtual firewall. Be restrictive — only allow what is explicitly needed.<br><br>
<strong>Transition to Speaker 5:</strong> "Now [Speaker 5] will tackle one of the most important cloud concepts — scaling. What happens when your application needs to handle more users?"`,

  23: `<strong>Speaker 5 · ~3 min</strong><br><em>Interactive Scaling Demo</em><br><br>
Move the slider slowly, narrating each level. Let the audience see the server state change. Pause at 10,000 to discuss the "server overloaded" state.<br><br>
Remind: These numbers are illustrative. A well-optimized app might handle 10,000 users on one instance; a poorly optimized one might struggle at 100.<br><br>
<strong>Key takeaway:</strong> Scaling is the ability to grow your infrastructure to match demand.<br><br>
<strong>Transition:</strong> There are two fundamental approaches to scaling. Let's cover the first one.`,

  24: `<strong>Speaker 5 · ~2 min</strong><br><em>Vertical Scaling</em><br><br>
Click the server visualization to demonstrate scale-up. Walk through pros and cons.<br><br>
Good analogy: "It's like upgrading your laptop from 8 GB to 32 GB RAM. Same machine, more capable."<br><br>
Key limitation: You can only make one machine so big. Eventually, you hit a wall.<br><br>
<strong>Key takeaway:</strong> Vertical scaling = more power in one machine. Simple, but limited.<br><br>
<strong>Transition:</strong> The alternative is to add more machines.`,

  25: `<strong>Speaker 5 · ~2 min</strong><br><em>Horizontal Scaling — Interactive</em><br><br>
Click "Add Instance" to demonstrate. The load balancer distributes traffic across all instances.<br><br>
Analogy: "Instead of one very fast cashier, open more checkout lanes."<br><br>
Discuss: requires stateless application architecture (sessions, state must be handled externally). Not every app can be horizontally scaled without redesign.<br><br>
<strong>Key takeaway:</strong> Horizontal scaling = more machines. More resilient, but more complex.<br><br>
<strong>Transition:</strong> Let's compare both side by side.`,

  26: `<strong>Speaker 5 · ~2 min</strong><br><em>Comparison Table</em><br><br>
Walk through each row. Mention Auto Scaling Groups — AWS can automatically add/remove instances based on demand metrics. This is one of cloud's biggest advantages.<br><br>
Most production systems use both — vertical scaling for baseline, horizontal for peaks.<br><br>
<strong>Key takeaway:</strong> Know both approaches; use them together.<br><br>
<strong>Transition to Speaker 6:</strong> "Now [Speaker 6] will take us into Amazon S3 — the object storage service that holds the world's data."`,

  27: `<strong>Speaker 6 · ~2 min</strong><br><em>S3 Introduction</em><br><br>
Explain the 3 key terms clearly: Bucket (container), Object (the file + metadata), Key (the name/path).<br><br>
Use the bucket visual on the slide. Emphasize: S3 is NOT a filesystem or hard drive — it's object storage. You don't "install" things into S3.<br><br>
<strong>Key takeaway:</strong> S3 stores objects (files) in buckets. Access via API. Virtually unlimited scale.<br><br>
<strong>Transition:</strong> How does S3 differ from EC2? Let's compare.`,

  28: `<strong>Speaker 6 · ~2 min</strong><br><em>EC2 vs S3</em><br><br>
Walk through both columns. The flow diagram at the bottom shows them working together — EC2 runs the app logic, S3 stores the files.<br><br>
Real-world example: "Instagram's app logic runs on compute (like EC2). Your photos are stored in object storage (like S3)."<br><br>
<strong>Key takeaway:</strong> EC2 = compute + run code. S3 = storage + hold files. They complement each other.<br><br>
<strong>Transition:</strong> What happens when you accidentally overwrite an important file?`,

  29: `<strong>Speaker 6 · ~3 min</strong><br><em>S3 Versioning — Interactive</em><br><br>
Start with the scenario — student overwrites thesis document. Pause for audience reaction.<br><br>
Click the version cards to show how you'd restore V1 or V2. Click "Simulate Upload" to see a new version added.<br><br>
Important: Versioning must be enabled explicitly. It costs more (you're storing more data). It's not a full backup strategy.<br><br>
<strong>Key takeaway:</strong> Versioning = safety net for accidental overwrites. Enable it for important buckets.<br><br>
<strong>Transition:</strong> Not all data needs to be in the same storage class. Let's explore storage tiers.`,

  30: `<strong>Speaker 6 · ~3 min</strong><br><em>Storage Classes — Interactive</em><br><br>
Click each tier row to show details. Walk from top (frequent access, higher cost) to bottom (archive, lower cost but slower retrieval).<br><br>
Key analogy: "Should your monthly grocery list cost the same to store as a 20-year-old tax return you'll probably never look at again?"<br><br>
Emphasize: storage cost ≠ retrieval cost. Glacier might have cheap storage but retrieval has a fee.<br><br>
<strong>Key takeaway:</strong> Match storage class to access pattern. Don't pay daily-access prices for archival data.<br><br>
<strong>Transition:</strong> Let's look at Glacier specifically.`,

  31: `<strong>Speaker 6 · ~2 min</strong><br><em>Glacier Deep Dive</em><br><br>
Walk through the three Glacier options: Instant, Flexible, Deep Archive. The retrieval times differ significantly.<br><br>
Good real-world examples: Hospital keeping patient records for 10 years (rarely accessed), legal firms keeping contract archives, universities keeping old research data.<br><br>
<strong>Key takeaway:</strong> Glacier = archive storage. Low cost to store, planned retrieval times. Not for active data.<br><br>
<strong>Transition:</strong> How do you choose between all these options?`,

  32: `<strong>Speaker 6 · ~3 min</strong><br><em>Decision Helper — Interactive</em><br><br>
Walk the audience through the questions. Let someone in the audience answer them for their use case. Click answers and show the result.<br><br>
Reinforce: This is an educational starting point. Real production decisions involve pricing calculators, compliance requirements, and architecture reviews.<br><br>
<strong>Key takeaway:</strong> Start with your access patterns and work backwards to the right storage class.<br><br>
<strong>Transition to Speaker 7:</strong> "Now the moment you've been waiting for — [Speaker 7] will take us through a live demonstration on actual AWS infrastructure."`,

  33: `<strong>Speaker 7 · ~2 min</strong><br><em>Hands-On Setup</em><br><br>
Introduce the live demo. Checklist items can be clicked as you complete each step.<br><br>
If multiple people are following along, ensure everyone has access to an authorized account before starting.<br><br>
<strong>Key takeaway:</strong> We're about to do this for real on AWS. Let's go!<br><br>
<strong>Transition:</strong> First, a few important safety points.`,

  34: `<strong>Speaker 7 · ~2 min</strong><br><em>Safety Briefing</em><br><br>
Go through each safety point clearly. This is important — students may try to continue using AWS after the session.<br><br>
Critical: Block Public Access stays ON. No public bucket policies. Delete resources after the demo.<br><br>
<strong>Key takeaway:</strong> Use AWS responsibly. Clean up when done. Never share credentials.<br><br>
<strong>Transition:</strong> Let's begin the step-by-step procedure.`,

  35: `<strong>Speaker 7 · ~10-15 min</strong><br><em>Live Demo — Follow the Steps</em><br><br>
Go through each step on the actual AWS Console while this slide is displayed. The audience can follow along.<br><br>
Speak aloud what you're clicking: "I'm searching for S3... clicking Create bucket... entering a unique name..."<br><br>
If something doesn't look exactly like described, adapt: "AWS sometimes updates their UI. If you see something slightly different, look for the same concept — Create bucket, Upload, etc."<br><br>
<strong>Key takeaway:</strong> You just created a real cloud storage bucket and uploaded a file to AWS!<br><br>
<strong>Transition:</strong> Let's look at common problems people encounter.`,

  36: `<strong>Speaker 7 · ~3 min</strong><br><em>Troubleshooting</em><br><br>
Walk through each common issue. If any problem actually occurred during the demo, highlight that one.<br><br>
The "Can't access object via URL" point is important — help students understand why the direct S3 URL doesn't work (it's private by design).<br><br>
<strong>Key takeaway:</strong> Errors are learning opportunities. Use the troubleshooting guide to diagnose and fix.<br><br>
<strong>Transition:</strong> Let's recap everything we've covered today.`,

  37: `<strong>Speaker 7 · ~2 min</strong><br><em>Visual Recap</em><br><br>
Walk through each recap card. This is the "zoom out" moment — show the complete journey.<br><br>
Invite audience to recall each concept as you mention it. Quick quiz: "What was the difference between EC2 and S3?" etc.<br><br>
<strong>Key takeaway:</strong> From not knowing what a server is to creating a real cloud storage bucket — that's today's journey.<br><br>
<strong>Transition:</strong> Let's open it up for questions.`,

  38: `<strong>All Speakers · ~5 min</strong><br><em>Q&A and Wrap-Up</em><br><br>
Each discussion question can spark a full conversation:<br>
1. EC2 vs S3 — compute vs storage<br>
2. Vertical vs horizontal — simplicity vs resilience and scale<br>
3. Glacier vs Standard — cost vs access speed vs retrieval charges<br><br>
Invite follow-up questions. Point interested students to AWS Free Tier, AWS Skill Builder, and AWS documentation.<br><br>
<strong>Final thought:</strong> "Cloud computing isn't just a technology — it's changed what's possible for individuals, startups, and enterprises. You now have the vocabulary to explore it further."`,
};

/* ── Navigation ────────────────────────────────────────── */
function goToSlide(n, direction = 'next') {
  if (n < 1 || n > state.total) return;
  const prev = state.current;
  const prevSlide = document.getElementById(`slide-${prev}`);
  const nextSlide = document.getElementById(`slide-${n}`);
  if (!nextSlide) return;

  // Animate out / in
  if (prevSlide && prev !== n) {
    prevSlide.classList.remove('active');
    prevSlide.classList.add('exit');
    setTimeout(() => prevSlide.classList.remove('exit'), 300);
  }
  nextSlide.classList.add('active', 'enter');
  setTimeout(() => nextSlide.classList.remove('enter'), 350);

  state.current = n;
  updateUI();
  updateNotes();

  // Trigger slide-specific init
  onSlideEnter(n);
}

function nextSlide() { goToSlide(state.current + 1, 'next'); }
function prevSlide() { goToSlide(state.current - 1, 'prev'); }

function updateUI() {
  const n = state.current;
  const total = state.total;

  // Counter
  document.getElementById('slide-counter').textContent =
    String(n).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');

  // Progress bar
  document.getElementById('progress-bar-fill').style.width = ((n / total) * 100) + '%';
  document.querySelector('#progress-bar-track').setAttribute('aria-valuenow', n);

  // Section indicator
  const slide = document.getElementById(`slide-${n}`);
  if (slide) {
    const section = slide.dataset.section || '';
    document.getElementById('section-indicator').textContent = section;
  }

  // Nav buttons
  document.getElementById('btn-prev').disabled = (n === 1);
  document.getElementById('btn-next').disabled = (n === total);

  // Overview active state
  document.querySelectorAll('.overview-thumb').forEach((el, i) => {
    el.classList.toggle('current', i + 1 === n);
  });
}

/* ── Slide Enter Hooks ──────────────────────────────────── */
function onSlideEnter(n) {
  if (n === 3) animateBars();
  if (n === 19) resetVMDiagram();
  if (n === 24) resetVerticalScale();
  if (n === 25) resetHorizontalScale();
  if (n === 29) resetS3Sim();
}

/* ── Keyboard Navigation ────────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (e.target.hasAttribute('contenteditable') && e.target.isContentEditable) return;
  switch (e.key) {
    case 'ArrowRight': case 'ArrowDown': case ' ':
      if (!state.overviewOpen) { e.preventDefault(); nextSlide(); } break;
    case 'ArrowLeft': case 'ArrowUp':
      if (!state.overviewOpen) { e.preventDefault(); prevSlide(); } break;
    case 'Home': goToSlide(1); break;
    case 'End':  goToSlide(state.total); break;
    case 'o': case 'O': toggleOverview(); break;
    case 'n': case 'N': toggleNotes(); break;
    case 'f': case 'F': toggleFullscreen(); break;
    case 'Escape':
      if (state.overviewOpen) closeOverview();
      else if (document.getElementById('shortcut-overlay').classList.contains('open')) closeShortcuts();
      else if (state.notesOpen) toggleNotes();
      else if (document.fullscreenElement) document.exitFullscreen();
      break;
  }
});

// Keyboard activation for interactive elements
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    const el = document.activeElement;
    if (el && el.getAttribute('role') === 'button') {
      e.preventDefault();
      el.click();
    }
    if (el && el.getAttribute('role') === 'checkbox') {
      e.preventDefault();
      el.click();
    }
  }
});

/* ── Bar Chart Animation (Slide 3) ─────────────────────── */
function animateBars() {
  if (state.barsAnimated[3]) return;
  state.barsAnimated[3] = true;
  setTimeout(() => {
    document.querySelectorAll('#slide-3 .bar-fill').forEach(bar => {
      const target = bar.dataset.width;
      bar.style.width = target + '%';
    });
  }, 200);
}

/* ── Quiz Cards (Slide 2) ───────────────────────────────── */
function revealQuizCard(el, isAws) {
  el.classList.add('revealed');
  if (isAws) {
    document.getElementById('quiz-reveal-msg').style.display = 'block';
  }
}

// Auto-reveal all on first load of slide 2
function initSlide2() {
  setTimeout(() => {
    document.querySelectorAll('#slide-2 .quiz-card').forEach((card, i) => {
      setTimeout(() => card.classList.add('revealed'), i * 300);
    });
  }, 400);
}

/* ── VM Architecture (Slide 19) ─────────────────────────── */
function resetVMDiagram() {
  state.vmLayerStep = 0;
  ['vml-hw', 'vml-hyper', 'vml-arr1', 'vml-arr2', 'vmb-1', 'vmb-2', 'vmb-3'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.remove('visible');
      el.style.opacity = '0';
    }
  });
}

function revealVMLayer() {
  const steps = [
    () => {
      const hw = document.getElementById('vml-hw');
      if (hw) { hw.classList.add('visible'); hw.style.opacity = '1'; }
    },
    () => {
      const arr = document.getElementById('vml-arr1');
      if (arr) arr.style.opacity = '1';
      const hyper = document.getElementById('vml-hyper');
      if (hyper) { hyper.classList.add('visible'); hyper.style.opacity = '1'; }
    },
    () => {
      const arr2 = document.getElementById('vml-arr2');
      if (arr2) arr2.style.opacity = '1';
      ['vmb-1', 'vmb-2', 'vmb-3'].forEach((id, i) => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) el.classList.add('visible');
        }, i * 180);
      });
    },
  ];
  if (state.vmLayerStep < steps.length) {
    steps[state.vmLayerStep]();
    state.vmLayerStep++;
  } else {
    // Reset
    resetVMDiagram();
  }
}

function showVMInfo(type) {
  const msgs = {
    hw: '🖥️ <strong>Physical Hardware</strong> — Real CPU cores, RAM chips, SSDs, and network cards. This is the actual machine in an AWS data center.',
    hyper: '⚙️ <strong>Hypervisor</strong> — Software that creates and manages VMs. It allocates physical resources (CPU time, RAM, storage) to each VM. AWS Nitro System uses a custom lightweight hypervisor.',
  };
  if (msgs[type]) {
    const panel = document.getElementById('vm-info-panel');
    // Briefly flash
    panel.style.opacity = '0.7';
    setTimeout(() => panel.style.opacity = '1', 200);
  }
}

/* ── Traffic Slider (Slide 23) ──────────────────────────── */
const TRAFFIC_LEVELS = [
  { label: '10 visitors/day', cpu: '5%', status: '✓ Server handling traffic comfortably', statusColor: 'var(--green)',
    advice: 'With 10 visitors, a single small server handles everything easily. The CPU is barely working.', servers: 1, overloaded: false },
  { label: '100 visitors/day', cpu: '35%', status: '⚡ Moderate load — server is doing well', statusColor: 'var(--blue)',
    advice: 'At 100 visitors, the server is working harder but still within comfortable limits.', servers: 1, overloaded: false },
  { label: '1,000 visitors/day', cpu: '85%', status: '⚠️ High load — consider scaling soon', statusColor: 'var(--accent)',
    advice: '1,000 visitors is putting pressure on the server. Response times may increase. This is when you should plan for scaling.', servers: 1, overloaded: true },
  { label: '10,000 visitors/day', cpu: '💥 OVERLOADED', status: '🚨 Server overwhelmed — needs scaling NOW', statusColor: 'var(--red)',
    advice: '10,000 visitors on a single small server is too much. The application needs horizontal or vertical scaling to handle this load.', servers: 1, overloaded: true },
];

function updateTrafficDemo(val) {
  const level = TRAFFIC_LEVELS[parseInt(val)];
  document.getElementById('traffic-val').textContent = ['10', '100', '1,000', '10,000'][parseInt(val)];
  document.getElementById('traffic-status').textContent = level.status;
  document.getElementById('traffic-status').style.color = level.statusColor;
  document.getElementById('traffic-advice').innerHTML = level.advice;

  const server = document.getElementById('main-server');
  document.getElementById('server-cpu').textContent = 'CPU: ' + level.cpu;
  if (level.overloaded && parseInt(val) === 3) {
    server.classList.remove('active');
    server.classList.add('overloaded');
    document.getElementById('server-cpu').style.color = 'var(--red)';
  } else if (level.overloaded) {
    server.classList.add('overloaded');
    server.classList.remove('active');
    document.getElementById('server-cpu').style.color = 'var(--accent)';
  } else {
    server.classList.add('active');
    server.classList.remove('overloaded');
    document.getElementById('server-cpu').style.color = 'var(--green)';
  }
}

/* ── Vertical Scale (Slide 24) ──────────────────────────── */
const V_SCALE_STATES = [
  { label: 't3.small', cpu: 20, ram: 18, ssd: 12, hint: 'Click to upgrade to m5.large', color: 'var(--text-secondary)' },
  { label: 'm5.large', cpu: 40, ram: 45, ssd: 30, hint: 'Click to upgrade to c5.2xlarge', color: 'var(--blue)' },
  { label: 'c5.2xlarge', cpu: 75, ram: 70, ssd: 60, hint: 'Maximum size reached — click to reset', color: 'var(--accent)' },
];

function resetVerticalScale() {
  state.vScaleLevel = 0;
  applyVScale();
}

function toggleVerticalScale() {
  state.vScaleLevel = (state.vScaleLevel + 1) % V_SCALE_STATES.length;
  applyVScale();
}

function applyVScale() {
  const s = V_SCALE_STATES[state.vScaleLevel];
  document.getElementById('v-scale-label').textContent = s.label;
  document.getElementById('v-scale-label').style.color = s.color;
  document.getElementById('vr-cpu').style.width = s.cpu + '%';
  document.getElementById('vr-ram').style.width = s.ram + '%';
  document.getElementById('vr-ssd').style.width = s.ssd + '%';
  document.getElementById('v-scale-hint').textContent = s.hint;
  const server = document.getElementById('v-scale-server');
  server.classList.toggle('large', state.vScaleLevel > 0);
}

/* ── Horizontal Scale (Slide 25) ────────────────────────── */
function resetHorizontalScale() {
  state.hScaleCount = 1;
  for (let i = 2; i <= 4; i++) {
    const el = document.getElementById(`h-inst-${i}`);
    if (el) el.classList.remove('visible');
  }
}

function addHorizontalInstance() {
  if (state.hScaleCount >= 4) {
    state.hScaleCount = 1;
    resetHorizontalScale();
    return;
  }
  state.hScaleCount++;
  const el = document.getElementById(`h-inst-${state.hScaleCount}`);
  if (el) {
    setTimeout(() => el.classList.add('visible'), 50);
  }
}

function resetHScale() { resetHorizontalScale(); }

/* ── S3 Versioning Sim (Slide 29) ─────────────────────── */
let s3VersionCount = 3;

function resetS3Sim() {
  s3VersionCount = 3;
  const tl = document.getElementById('version-timeline');
  if (!tl) return;
  // Remove any extra versions added
  while (tl.children.length > 3) tl.removeChild(tl.lastChild);
  document.getElementById('version-restore-msg').style.display = 'none';
}

function s3SimUpload() {
  s3VersionCount++;
  const tl = document.getElementById('version-timeline');
  if (!tl) return;
  // Make all existing current cards not-current
  document.querySelectorAll('.version-card.current').forEach(c => {
    c.classList.remove('current');
    const badge = c.querySelector('.ver-badge');
    if (badge) { badge.textContent = 'V' + (s3VersionCount - 1); badge.className = 'ver-badge old'; }
  });
  const card = document.createElement('div');
  card.className = 'version-card current';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  const vId = 'v' + Math.random().toString(36).substr(2, 6);
  card.innerHTML = `
    <div class="ver-id">ver: ${vId}</div>
    <div class="ver-name">project.docx</div>
    <div class="ver-meta">📝 New upload<br>Size: ${Math.floor(Math.random()*200+100)} KB</div>
    <div class="ver-badge">V${s3VersionCount}</div>
  `;
  card.onclick = () => selectVersion(s3VersionCount - 1);
  tl.appendChild(card);
  card.style.opacity = '0'; card.style.transform = 'scale(.85)';
  setTimeout(() => { card.style.transition = 'all .4s'; card.style.opacity = '1'; card.style.transform = 'none'; }, 50);
}

function selectVersion(idx) {
  const msg = document.getElementById('version-restore-msg');
  const labels = ['Version 1 (original)', 'Version 2 (updated)', 'Version 3 (corrupted)', `Version ${idx + 1} (recent upload)`];
  const notes = [
    '✓ <strong>Restoring to Version 1</strong> — you\'d use the AWS Console to copy this version ID and restore or download it. The original file is safe!',
    '✓ <strong>Restoring to Version 2</strong> — chapter 3 was added here. A good recovery point.',
    '⚠️ <strong>This is the corrupted version</strong> — you\'d want to restore an earlier version instead.',
    `✓ <strong>Selected Version ${idx + 1}</strong> — versioning keeps all uploads safe.`,
  ];
  msg.innerHTML = notes[Math.min(idx, 3)];
  msg.style.display = 'block';
}

/* ── Tier Info (Slide 30) ──────────────────────────────── */
const TIER_INFO = [
  { name: 'S3 Standard', detail: 'Best for: active websites, mobile apps, frequently downloaded content. Stored across ≥3 Availability Zones for high durability. Higher cost per GB but no retrieval fees.', src: 'https://aws.amazon.com/s3/storage-classes/' },
  { name: 'S3 Intelligent-Tiering', detail: 'Best for: data with unpredictable or changing access patterns. Automatically moves objects between frequent and infrequent access tiers. Small monitoring and automation fee per object. Some tiers have retrieval charges.', src: 'https://aws.amazon.com/s3/storage-classes/' },
  { name: 'S3 Standard-IA', detail: 'Best for: disaster recovery files, backups, older datasets still needed occasionally. Minimum storage duration: 30 days. Per-GB retrieval charge applies. Millisecond access time.', src: 'https://aws.amazon.com/s3/storage-classes/' },
  { name: 'S3 One Zone-IA', detail: 'Best for: secondary backups of on-premises data, easily recreatable data. Stored in a single Availability Zone — lower resilience than multi-AZ options. Minimum 30-day storage, retrieval charges apply.', src: 'https://aws.amazon.com/s3/storage-classes/' },
  { name: 'S3 Glacier Instant Retrieval', detail: 'Best for: medical images, news media archives, genomics data — accessed once a quarter. Same millisecond retrieval as S3 Standard when accessed. Minimum 90-day storage duration. Retrieval fees apply.', src: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html' },
  { name: 'S3 Glacier Flexible Retrieval', detail: 'Best for: archival data accessed 1-2 times per year. Retrieval options: Expedited (~1-5 min), Standard (~3-5 hrs), Bulk (~5-12 hrs). Minimum 90-day storage. Good for DR archives and long-term backups.', src: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html' },
  { name: 'S3 Glacier Deep Archive', detail: 'Best for: compliance archives, financial records kept 7+ years, rarely accessed datasets. Retrieval: Standard ~12 hrs, Bulk ~48 hrs. Minimum 180-day storage duration. Lowest S3 storage cost per GB.', src: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/glacier-storage-classes.html' },
];

function showTierInfo(idx) {
  const box = document.getElementById('tier-info-box');
  const t = TIER_INFO[idx];
  box.innerHTML = `<strong>${t.name}:</strong> ${t.detail} <a href="${t.src}" target="_blank" rel="noopener" style="color:var(--blue-light);font-size:.65rem">→ AWS Docs</a>`;
  box.style.display = 'block';
}

/* ── Storage Decision Helper (Slide 32) ─────────────────── */
function setDecision(key, val) {
  state.decisionAnswers[key] = val;
  // Visual feedback
  const map = {
    freq: { daily: 'dq1a', monthly: 'dq1b', rarely: 'dq1c' },
    speed: { instant: 'dq2a', minutes: 'dq2b', hours: 'dq2c' },
    az: { yes: 'dq3a', no: 'dq3b' },
    pattern: { known: 'dq4a', unknown: 'dq4b' },
  };
  const group = map[key];
  if (group) {
    Object.values(group).forEach(id => {
      const btn = document.getElementById(id);
      if (btn) btn.classList.remove('selected');
    });
    const selected = document.getElementById(group[val]);
    if (selected) selected.classList.add('selected');
  }
}

function calculateDecision() {
  const a = state.decisionAnswers;
  const box = document.getElementById('decision-result');
  const cls = document.getElementById('decision-class');
  const note = document.getElementById('decision-note');
  let result, detail;

  if (a.pattern === 'unknown') {
    result = 'S3 Intelligent-Tiering';
    detail = 'When access patterns are unknown, Intelligent-Tiering automatically moves objects between access tiers. Note: monitoring fee per object applies. Some configurations have retrieval charges.';
  } else if (a.freq === 'daily') {
    result = 'S3 Standard';
    detail = 'Frequently accessed data belongs in S3 Standard. High durability across multiple Availability Zones, millisecond access, no retrieval fees.';
  } else if (a.freq === 'monthly' && a.speed === 'instant' && a.az === 'yes') {
    result = 'S3 Standard-IA';
    detail = 'Infrequently accessed data that still needs fast retrieval and multi-AZ durability. Retrieval charges apply. Minimum 30-day storage.';
  } else if (a.freq === 'monthly' && a.speed === 'instant' && a.az === 'no') {
    result = 'S3 One Zone-IA';
    detail = 'Single Availability Zone infrequent access storage. Lower cost than Standard-IA but stored in one AZ. Appropriate for easily recreatable data. Retrieval charges apply.';
  } else if (a.freq === 'rarely' && a.speed === 'instant') {
    result = 'S3 Glacier Instant Retrieval';
    detail = 'Archive data accessed quarterly that still needs millisecond access time. Minimum 90-day storage. Retrieval charges apply.';
  } else if (a.freq === 'rarely' && a.speed === 'minutes') {
    result = 'S3 Glacier Flexible Retrieval';
    detail = 'Archive data with planned retrieval needs. Minutes to hours retrieval options. Low storage cost. Minimum 90-day storage. Good for backup archives.';
  } else if (a.freq === 'rarely' && a.speed === 'hours') {
    result = 'S3 Glacier Deep Archive';
    detail = 'Long-term compliance or backup archive accessed once or twice per year. Retrieval in ~12 hours. Minimum 180-day storage. Lowest cost per GB.';
  } else {
    result = 'Needs More Analysis';
    detail = 'Your requirements don\'t fit a simple pattern. Consider discussing with an AWS architect or using the AWS pricing calculator to evaluate all options.';
  }

  cls.textContent = result;
  note.textContent = detail;
  box.classList.add('show');
}

/* ── Checklist (Slide 33) ───────────────────────────────── */
function toggleCheck(el) {
  const isDone = el.classList.toggle('done');
  el.setAttribute('aria-checked', isDone);
  const circle = el.querySelector('.chk-circle');
  circle.textContent = isDone ? '✓' : '';
}

function resetChecklist() {
  document.querySelectorAll('#demo-checklist .check-item').forEach(el => {
    el.classList.remove('done');
    el.setAttribute('aria-checked', 'false');
    el.querySelector('.chk-circle').textContent = '';
  });
}

/* ── Overview Modal ─────────────────────────────────────── */
function buildOverview() {
  const grid = document.getElementById('overview-grid');
  grid.innerHTML = '';
  SLIDES.forEach((slide, i) => {
    const n = i + 1;
    const title = slide.dataset.title || `Slide ${n}`;
    const section = slide.dataset.section || '';
    const thumb = document.createElement('div');
    thumb.className = 'overview-thumb' + (n === state.current ? ' current' : '');
    thumb.setAttribute('role', 'listitem');
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('aria-label', `Slide ${n}: ${title}`);
    thumb.innerHTML = `<div class="ov-num">${String(n).padStart(2,'0')}</div><div class="ov-title">${title}</div><div class="ov-section">${section}</div>`;
    thumb.onclick = () => { goToSlide(n); closeOverview(); };
    thumb.addEventListener('keydown', e => { if (e.key === 'Enter') { goToSlide(n); closeOverview(); } });
    grid.appendChild(thumb);
  });
}

function toggleOverview() {
  state.overviewOpen = !state.overviewOpen;
  const modal = document.getElementById('overview-modal');
  if (state.overviewOpen) {
    buildOverview();
    modal.classList.add('open');
    document.getElementById('overview-close').focus();
  } else {
    modal.classList.remove('open');
  }
}

function closeOverview() {
  state.overviewOpen = false;
  document.getElementById('overview-modal').classList.remove('open');
  document.getElementById('btn-overview').focus();
}

/* ── Presenter Notes ────────────────────────────────────── */
function updateNotes() {
  const body = document.getElementById('notes-body');
  body.innerHTML = NOTES[state.current] || '<em style="color:var(--text-muted)">No notes for this slide.</em>';
}

function toggleNotes() {
  state.notesOpen = !state.notesOpen;
  document.getElementById('notes-panel').classList.toggle('open', state.notesOpen);
  document.getElementById('btn-notes').classList.toggle('active', state.notesOpen);
  if (state.notesOpen) {
    updateNotes();
    document.getElementById('notes-close').focus();
  }
}

/* ── Fullscreen ─────────────────────────────────────────── */
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

/* ── Shortcut Overlay ───────────────────────────────────── */
function closeShortcuts() {
  document.getElementById('shortcut-overlay').classList.remove('open');
  document.getElementById('btn-keys').focus();
}

/* ── Button wiring ──────────────────────────────────────── */
document.getElementById('btn-overview').addEventListener('click', toggleOverview);
document.getElementById('btn-notes').addEventListener('click', toggleNotes);
document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
document.getElementById('btn-keys').addEventListener('click', () => {
  document.getElementById('shortcut-overlay').classList.add('open');
  document.querySelector('.shortcut-close-btn').focus();
});
document.getElementById('btn-reset').addEventListener('click', () => {
  // Reset current slide's interactive state
  resetChecklist();
  resetS3Sim();
  resetHorizontalScale();
  resetVerticalScale();
  resetVMDiagram();
  state.decisionAnswers = {};
  const box = document.getElementById('decision-result');
  if (box) box.classList.remove('show');
  document.querySelectorAll('.q-btn').forEach(b => b.classList.remove('selected'));
  const tib = document.getElementById('tier-info-box');
  if (tib) tib.style.display = 'none';
  updateTrafficDemo(0);
  const slider = document.getElementById('traffic-slider');
  if (slider) slider.value = 0;
});

/* ── Responsive container scaling ──────────────────────── */
function scaleSlideContainer() {
  const stage = document.getElementById('slide-stage');
  const container = document.getElementById('slide-container');
  if (!stage || !container) return;
  const stageW = stage.clientWidth - 16;
  const stageH = stage.clientHeight - 16;
  const aspectW = 1280, aspectH = 720;
  const scaleW = stageW / aspectW;
  const scaleH = stageH / aspectH;
  const scale = Math.min(scaleW, scaleH, 1);
  const w = Math.floor(aspectW * scale);
  const h = Math.floor(aspectH * scale);
  container.style.width = w + 'px';
  container.style.maxWidth = '100%';
  // Override aspect-ratio padding trick for exact sizing
  container.style.paddingBottom = '0';
  container.style.height = h + 'px';
  container.querySelector('.slide-inner').style.height = h + 'px';
}

window.addEventListener('resize', scaleSlideContainer);

/* ── Init ───────────────────────────────────────────────── */
function init() {
  scaleSlideContainer();
  updateUI();
  updateNotes();
  initSlide2();

  // Show slide 1 bar animations after a small delay
  setTimeout(() => {
    const slide1 = document.getElementById('slide-1');
    if (slide1) slide1.classList.add('active');
  }, 100);
}

document.addEventListener('DOMContentLoaded', init);
