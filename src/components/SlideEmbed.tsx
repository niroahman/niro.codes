interface Props {
  url: string;
  title?: string;
}

function embedUrl(url: string): string {
  if (url.includes('docs.google.com/presentation')) {
    const base = url.split('/edit')[0].split('/pub')[0];
    return `${base}/embed?start=false&loop=false&delayms=3000`;
  }
  if (url.includes('speakerdeck.com')) {
    return url.replace('speakerdeck.com/', 'speakerdeck.com/embed/');
  }
  return url;
}

export default function SlideEmbed({ url, title = 'Slide deck' }: Props) {
  return (
    <div className="slide-embed">
      <iframe src={embedUrl(url)} title={title} allowFullScreen frameBorder="0" loading="lazy" />
    </div>
  );
}
