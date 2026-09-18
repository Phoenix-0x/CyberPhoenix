import { getSortedEvents, EventResource } from '@/lib/data/events';
import styles from './events.module.css';
import { CircleCheckBig, CalendarClock, Presentation, FileText, TerminalSquare, Code2, ExternalLink, Layers } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import ShinyText from '@/components/ui/ShinyText';

export const metadata: Metadata = {
  title: 'Events | CyberPhoenix',
  description: 'Past and upcoming events by CyberPhoenix.',
};

function getResourceIcon(iconType: string) {
  switch (iconType) {
    case 'slides': return <Presentation size={16} />;
    case 'doc': return <FileText size={16} />;
    case 'platform': return <TerminalSquare size={16} />;
    case 'github': return <Code2 size={16} />;
    default: return <ExternalLink size={16} />;
  }
}

export default function EventsPage() {
  const events = getSortedEvents();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span>CYBERPHOENIX</span>
          <ShinyText text="TIMELINE" speed={3} className={styles.highlightText} color="var(--color-1)" shineColor="#ffffff" yoyo={true} />
        </h1>
        <div className={styles.subtitle}>
          <span>Explore our journey through past workshops,</span>
          <span>hackathons, and upcoming events.</span>
        </div>
      </header>

      <div className={styles.timeline}>
        {events.map((event) => {
          const isConcluded = event.status === 'concluded';
          const eventDate = new Date(event.date);
          const monthDay = eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
          const year = eventDate.getFullYear();

          return (
            <div key={event.slug} className={styles.timelineRow}>
              {/* Left Column: Date */}
              <div className={styles.dateCol}>
                <span className={styles.dateMonth}>{monthDay}</span>
                <span className={styles.dateYear}>{year}</span>
              </div>

              {/* Middle Column: Line and Marker */}
              <div className={styles.dividerCol}>
                <div className={styles.line}></div>
                <div className={`${styles.marker} ${isConcluded ? styles.markerConcluded : styles.markerUpcoming}`}>
                  {isConcluded ? <CircleCheckBig size={20} strokeWidth={2} /> : <CalendarClock size={20} strokeWidth={2} />}
                </div>
              </div>
              
              {/* Right Column: Card Content */}
              <div className={styles.cardCol}>
                <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                    <h2 className={styles.eventTitle}>
                      {event.id && <span className={styles.eventId}>{event.id} <span style={{opacity: 0.5}}>-</span> </span>}
                      {event.title}
                    </h2>
                    <div className={styles.badgesWrapper}>
                      <div className={`${styles.statusBadge} ${isConcluded ? styles.statusConcluded : styles.statusUpcoming}`}>
                        {isConcluded ? 'CONCLUDED' : 'UPCOMING'}
                      </div>
                      {event.tentative && !isConcluded && (
                        <div className={`${styles.statusBadge} ${styles.statusTentative}`}>
                          TENTATIVE
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {event.tagline && (
                    <div className={styles.tagline}>{event.tagline}</div>
                  )}

                  {event.keywords && event.keywords.length > 0 && (
                    <div className={styles.keywords}>
                      {event.keywords.map(keyword => (
                        <span key={keyword} className={styles.keyword}>
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}

                  {event.resources && event.resources.length > 0 && (
                    <div className={styles.resourcesWrapper}>
                      <div className={styles.resourcesLabel}>
                        <Layers size={14} /> Event Resources
                      </div>
                      <div className={styles.resourcesGrid}>
                        {event.resources.map((res: EventResource, idx: number) => (
                          <Link key={idx} href={res.url} className={styles.resourceBtn} target="_blank" rel="noopener noreferrer">
                            {getResourceIcon(res.icon)}
                            {res.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
