import Button from "@/components/ui/Button";
import styles from "./page.module.css";
import socials from "@/lib/data/socials.json";
import {
  MessageCircle,
  Camera,
  Briefcase,
  Code2,
  Shield,
  Terminal,
  Globe,
  Users,
  PlaySquare,
  Bird,
} from "lucide-react";
import LogoIcon from "@/components/ui/LogoIcon";

export default function Home() {
  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case "message-circle":
        return <MessageCircle size={18} />;
      case "instagram":
        return <Camera size={18} />;
      case "linkedin":
        return <Briefcase size={18} />;
      case "github":
        return <Code2 size={18} />;
      case "youtube":
        return <PlaySquare size={18} />;
      case "twitter":
        return <Bird size={18} />;
      default:
        return <Globe size={18} />;
    }
  };

  const offers = [
    {
      title: "Hands-on Workshops",
      description:
        "Dive deep into cybersecurity concepts with practical, lab-based sessions covering everything from Linux fundamentals to advanced penetration testing.",
      icon: <Terminal size={32} />,
    },
    {
      title: "CTF Challenges",
      description:
        "Put your skills to the test in our custom Capture The Flag events. Compete with peers, solve complex puzzles, and climb the leaderboard.",
      icon: <Shield size={32} />,
    },
    {
      title: "Community Network",
      description:
        "Join a vibrant community of like-minded individuals. Share knowledge, collaborate on projects, and build connections that last a lifetime.",
      icon: <Users size={32} />,
    },
  ];

  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.section1}>
        <div className={styles.heroLogoWrapper}>
          <LogoIcon size={220} className={styles.heroLogo} useGradient={true} />
        </div>
        <h1 className={styles.heroHeading}>
          <span className={styles.highlightText}>SECURING TOMORROW&apos;S</span>
          <span>WORLD TODAY</span>
        </h1>
        <div className={styles.heroSubtext}>
          <span>Every realm needs guardians—cyberspace is no exception.</span>
          <span>Thus we rise to shatter myths, conquer cybersecurity,</span>
          <span>and help forge the defenders of cyberspace!</span>
        </div>

        {/* Socials Integration */}
        <div className={styles.socialsContainer}>
          {socials.map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
            >
              {getSocialIcon(social.icon)}
              {social.name}
            </a>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span>WHO WE </span>
          <span className={styles.highlightText}>ARE?</span>
        </h2>
        <div className={styles.sectionContent}>
          <p>
            The digital realm is engulfed in mystery, with evil lurking around
            every corner ready to hunt the innocent souls who remain oblivious
            to this world.
          </p>
          <p>
            But there are those who refuse to let innocent souls fall prey to
            the dangers of the digital world. They fight cyber threats, and
            empower safe exploration. They are here to teach the ways of this
            realm, empowering everyone to explore its wonders safely and without
            fear. Meet these guardians below.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <Button href="/about">About Us</Button>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className={styles.section3}>
        <h2 className={styles.sectionTitle} style={{ textAlign: "center" }}>
          <span>WHAT WE </span>
          <span className={styles.highlightText}>OFFER</span>
        </h2>

        <div className={styles.offerGrid}>
          {offers.map((offer, idx) => (
            <div key={idx} className={styles.offerCard}>
              <div className={styles.offerIcon}>{offer.icon}</div>
              <h3 className={styles.offerTitle}>{offer.title}</h3>
              <p className={styles.offerText}>{offer.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
