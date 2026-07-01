/**
 * features/landing/FeaturesSection.jsx
 */
import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

const FEATURES = [
  {
    icon: '✦',
    title: 'AI Text Generation',
    description: 'Generate high-quality stories, scripts, and copy using state-of-the-art language models.',
  },
  {
    icon: '🎨',
    title: 'AI Image Creation',
    description: 'Bring your narratives to life with AI-generated concept art and scene illustrations.',
  },
  {
    icon: '📚',
    title: 'Project Management',
    description: 'Organise all your creative projects in one place with version history and collaboration tools.',
  },
  {
    icon: '⚡',
    title: 'Instant Export',
    description: 'Export to PDF, EPUB, Final Draft, or plain text with a single click.',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function FeaturesSection() {
  return (
    <section id="features" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-[var(--color-text-primary)]">
            Everything you need to create
          </h2>
          <p className="mt-3 text-[var(--color-text-secondary)]">
            Professional-grade AI tools designed for writers and creators.
          </p>
        </div>

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FEATURES.map((feat) => (
            <motion.div key={feat.title} variants={item}>
              <Card className="h-full">
                <span className="mb-3 block text-3xl">{feat.icon}</span>
                <h3 className="mb-2 font-semibold text-[var(--color-text-primary)]">
                  {feat.title}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {feat.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
