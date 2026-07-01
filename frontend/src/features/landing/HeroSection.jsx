/**
 * features/landing/HeroSection.jsx
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../constants/routes';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="ai" className="mb-6">
            ✦ Powered by AI
          </Badge>

          <h1 className="mb-6 text-4xl font-bold leading-tight text-[var(--color-text-primary)] sm:text-5xl lg:text-6xl">
            Create stories that{' '}
            <span className="text-[var(--color-ai)]">captivate</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-[var(--color-text-secondary)]">
            StoryForge AI turns your ideas into compelling narratives, scripts,
            and worlds — in seconds.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button as={Link} to={ROUTES.REGISTER} size="lg">
              Start creating free
            </Button>
            <Button as={Link} to="/#features" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
