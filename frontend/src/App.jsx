/**
 * App.jsx
 * Root component — mounts all global context providers and the router.
 * Provider order: Theme → Auth → AI → Router
 */
import { ThemeProvider }   from './contexts/ThemeContext';
import { AuthProvider }    from './contexts/AuthContext';
import { AIProvider }      from './contexts/AIContext';
import { ProjectProvider }  from './contexts/ProjectContext';
import { TemplateProvider } from './contexts/TemplateContext';
import { EditorProvider }   from './contexts/EditorContext';
import AppRouter from './routes/AppRouter';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <AIProvider>
            <ProjectProvider>
              <TemplateProvider>
                <EditorProvider>
                  <AppRouter />
                  <Toaster
                    position="top-right"
                    richColors
                    closeButton
                    toastOptions={{
                      style: {
                        fontFamily: 'var(--font-sans)',
                        fontSize: 'var(--text-sm)',
                      },
                    }}
                  />
                </EditorProvider>
              </TemplateProvider>
            </ProjectProvider>
          </AIProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}