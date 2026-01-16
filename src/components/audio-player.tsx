import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { AMBIPHONE_SOUNDS } from '../lib/ambiphone';
import { useLocalStorage } from '../hooks/use-local-storage';

export function AudioPlayer() {
  const [selectedSound, setSelectedSound] = useLocalStorage('audio-sound', 'heavy-rain');
  const [volume, setVolume] = useLocalStorage('audio-volume', 50);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      const sound = AMBIPHONE_SOUNDS.find((s) => s.id === selectedSound);
      if (sound) {
        audioRef.current.src = sound.url;
        if (isPlaying) {
          audioRef.current.play().catch(console.error);
        }
      }
    }
  }, [selectedSound, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="py-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Background Sound</Label>
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        <div className="flex gap-2">
          {AMBIPHONE_SOUNDS.map((sound) => (
            <Button
              key={sound.id}
              variant={selectedSound === sound.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedSound(sound.id)}
            >
              {sound.name}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {volume === 0 ? (
            <VolumeX className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          )}
          <Slider
            value={[volume]}
            onValueChange={(value: number[]) => setVolume(value[0])}
            max={100}
            step={1}
            className="flex-1"
            aria-label="Volume"
          />
          <span className="text-xs text-muted-foreground w-8">{volume}%</span>
        </div>

        <audio ref={audioRef} loop>
          <track kind="captions" />
        </audio>
      </CardContent>
    </Card>
  );
}
