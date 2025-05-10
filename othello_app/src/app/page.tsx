import dynamic from 'next/dynamic';

const Othello = dynamic(() => import('./components/Othello'), {
});

export default function OthelloPage() {
  return <Othello />;
}