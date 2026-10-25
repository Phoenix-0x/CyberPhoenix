import { getMembers, Team, Role, Status } from "@/lib/data/members";
import MemberCard from "@/components/ui/MemberCard";
import styles from "./about.module.css";

export default async function About() {
  const members = await getMembers();
  
  // All Founders and Mentors go here, regardless of active/alumni status
  const faculty = members.filter(m => m.roles.includes(Role.FACULTY));
  const mentors = members.filter(m => 
    (m.roles.includes(Role.MENTOR) || m.roles.includes(Role.FOUNDER)) && 
    m.status !== Status.RESIGNED && 
    m.status !== Status.REMOVED
  );
  
  // Exclude them from the rest of the teams so they don't appear twice
  const coreTeam = members.filter(m => 
    m.teams.includes(Team.CORE) && 
    !m.roles.includes(Role.MENTOR) && 
    !m.roles.includes(Role.FOUNDER) && 
    m.status === Status.ACTIVE
  );
  
  const techTeam = members.filter(m => m.teams.includes(Team.TECH) && !m.teams.includes(Team.CORE) && !m.roles.includes(Role.MENTOR) && !m.roles.includes(Role.FOUNDER) && m.status === Status.ACTIVE);
  const mediaTeam = members.filter(m => m.teams.includes(Team.MEDIA) && !m.teams.includes(Team.CORE) && !m.roles.includes(Role.MENTOR) && !m.roles.includes(Role.FOUNDER) && m.status === Status.ACTIVE);
  const cyberteam=members.filter((m)=>{return m.teams.includes(Team.CYBER) && !m.teams.includes(Team.CORE) && !m.roles.includes(Role.MENTOR) && !m.roles.includes(Role.FOUNDER) && m.status=== Status.ACTIVE})
  
  const specialMentions = members.filter(m => 
    m.status === Status.RESIGNED || 
    m.status === Status.REMOVED
  );


  return (
    <main className={styles.container}>
      <section className={styles.section1}>
        <h1 className={styles.heroHeading}>
          <span className={styles.highlightText}>AN AMAZING</span>
          <span>TECHNICAL CLUB.</span>
        </h1>
        <div className={styles.heroSubtext}>
          <span>Group of aspiring techies gathered</span>
          <span>together to guide students</span>
          <span>learn the ways of cybersecurity.</span>
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span>BUT WHO</span>
          <span className={styles.highlightText}>WE REALLY</span>
          <span>ARE?</span>
        </h2>
        <div className={styles.textContent}>
          <span>We are a group of students</span>
          <span>from CSE department of GJUS&T</span>
          <span>passionate about cybersecurity</span>
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>OUR</span>
          <span>GOALS</span>
        </h2>
        <div className={styles.goalsGrid}>
          <div className={styles.goalCard}>
            <div className={styles.goalHead}>1. Forge Cyber Guardians</div>
            <div className={styles.goalBody}>Train and empower individuals with the knowledge and skills to defend the digital realm.</div>
          </div>
          <div className={styles.goalCard}>
            <div className={styles.goalHead}>2. Demystify the Cyber World</div>
            <div className={styles.goalBody}>Break myths and misconceptions about cybersecurity, making it accessible to all.</div>
          </div>
          <div className={styles.goalCard}>
            <div className={styles.goalHead}>3. Engage in Ethical Mastery</div>
            <div className={styles.goalBody}>Promote ethical hacking, responsible security practices, and cyber awareness.</div>
          </div>
          <div className={styles.goalCard}>
            <div className={styles.goalHead}>4. Build a United Front</div>
            <div className={styles.goalBody}>Foster a strong community of like-minded defenders, sharing knowledge and growing together.</div>
          </div>
          <div className={styles.goalCard}>
            <div className={styles.goalHead}>5. Face the Digital Trials</div>
            <div className={styles.goalBody}>Provide hands-on challenges, competitions, and real-world scenarios to sharpen skills.</div>
          </div>
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>FACULTY</span>
          <span>ADVISORS</span>
        </h2>
        <div className={styles.teamGrid}>
          {faculty.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>FOUNDERS &</span>
          <span>MENTORS</span>
        </h2>
        <div className={styles.teamGrid}>
          {mentors.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>CORE</span>
          <span>TEAM</span>
        </h2>
        <div className={styles.teamGrid}>
          {coreTeam.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>TECH</span>
          <span>TEAM</span>
        </h2>
        <div className={styles.teamGrid}>
          {techTeam.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>

      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>MEDIA</span>
          <span>TEAM</span>
        </h2>
        <div className={styles.teamGrid}>
          {mediaTeam.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>
      
      <section className={styles.section2}>
        <h2 className={styles.sectionTitle}>
          <span className={styles.highlightText}>CYBER </span>
          <span>TEAM</span>
        </h2>
        <div className={styles.teamGrid}>
          {cyberteam.map((member) => <MemberCard key={member.id} member={member} />)}
        </div>
      </section>

      {specialMentions.length > 0 && (
        <section className={styles.section2}>
          <h2 className={styles.sectionTitle}>
            <span>SPECIAL</span>
            <span className={styles.highlightText}>MENTIONS</span>
          </h2>
          <div className={styles.textContent}>
            <p style={{ fontSize: '0.9rem' }}>Recognizing past contributors who helped shape our journey.</p>
          </div>
          <div className={styles.teamGrid}>
            {specialMentions.map((member) => <MemberCard key={member.id} member={member} />)}
          </div>
        </section>
      )}
    </main>
  );
}
