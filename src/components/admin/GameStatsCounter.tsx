import React from 'react';
import { Card } from '@/components/ui/card';
import { useGameStats } from '@/hooks/useGameStats';

interface GameStatsCounterProps {
  themeId?: string | null;
}

const GameStatsCounter = ({ themeId }: GameStatsCounterProps) => {
  const { stats, loading, error } = useGameStats(themeId);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="text-center">Carregando estatísticas do game...</div>
      </Card>
    );
  }

  if (error || !stats) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Erro ao carregar estatísticas do game
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Basic Stats */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Estatísticas Gerais</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.totalAttempts.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total de Tentativas</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.uniquePlayers.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Jogadores Únicos</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.averageScore}
            </div>
            <div className="text-sm text-muted-foreground">Pontuação Média</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.averageTime}s
            </div>
            <div className="text-sm text-muted-foreground">Tempo Médio</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.bestScore}
            </div>
            <div className="text-sm text-muted-foreground">Melhor Pontuação</div>
          </div>
          
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {stats.bestTime}s
            </div>
            <div className="text-sm text-muted-foreground">Melhor Tempo</div>
          </div>
        </div>
      </Card>

      {/* Category Stats */}
      {stats.categoryStats.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Estatísticas por Categoria</h3>
          <div className="grid gap-4">
            {stats.categoryStats.map((category) => (
              <div key={category.category} className="border rounded-lg p-4">
                <h4 className="font-medium mb-2 capitalize">{category.category}</h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tentativas:</span>
                    <div className="font-semibold">{category.attempts}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pontuação Média:</span>
                    <div className="font-semibold">{category.avg_score.toFixed(1)}</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tempo Médio:</span>
                    <div className="font-semibold">{category.avg_time.toFixed(1)}s</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Top Performers */}
      {stats.topPerformers.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Top 10 Performances</h3>
          <div className="space-y-2">
            {stats.topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{performer.name}</div>
                    <div className="text-sm text-muted-foreground capitalize">{performer.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{performer.score} pontos</div>
                  <div className="text-sm text-muted-foreground">{performer.time.toFixed(1)}s</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default GameStatsCounter;