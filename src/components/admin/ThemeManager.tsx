import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { QuizTheme } from '@/types/theme';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface ThemeManagerProps {
  onThemeChange?: () => void;
}

const ThemeManager: React.FC<ThemeManagerProps> = ({ onThemeChange }) => {
  const [themes, setThemes] = useState<QuizTheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTheme, setEditingTheme] = useState<QuizTheme | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    subtitle: '',
    is_active: true
  });
  const { toast } = useToast();

  useEffect(() => {
    loadThemes();
  }, []);

  const loadThemes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('quiz_themes')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;
      setThemes(data || []);
    } catch (error) {
      console.error('Error loading themes:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao carregar temas',
        description: 'Não foi possível carregar os temas.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (theme: QuizTheme) => {
    setEditingTheme(theme);
    setFormData({
      name: theme.name,
      slug: theme.slug,
      description: theme.description || '',
      subtitle: theme.subtitle || '',
      is_active: theme.is_active
    });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingTheme(null);
    setFormData({
      name: '',
      slug: '',
      description: '',
      subtitle: '',
      is_active: true
    });
  };

  const handleCancel = () => {
    setEditingTheme(null);
    setIsCreating(false);
    setFormData({
      name: '',
      slug: '',
      description: '',
      subtitle: '',
      is_active: true
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.slug) {
      toast({
        variant: 'destructive',
        title: 'Campos obrigatórios',
        description: 'Nome e slug são obrigatórios.'
      });
      return;
    }

    try {
      if (isCreating) {
        const { error } = await supabase
          .from('quiz_themes')
          .insert({
            name: formData.name,
            slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
            description: formData.description || null,
            subtitle: formData.subtitle || null,
            is_active: formData.is_active
          });

        if (error) throw error;

        toast({
          title: 'Tema criado',
          description: 'O tema foi criado com sucesso.'
        });
      } else if (editingTheme) {
        const { error } = await supabase
          .from('quiz_themes')
          .update({
            name: formData.name,
            slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
            description: formData.description || null,
            subtitle: formData.subtitle || null,
            is_active: formData.is_active
          })
          .eq('id', editingTheme.id);

        if (error) throw error;

        toast({
          title: 'Tema atualizado',
          description: 'O tema foi atualizado com sucesso.'
        });
      }

      handleCancel();
      loadThemes();
      onThemeChange?.();
    } catch (error: any) {
      console.error('Error saving theme:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar',
        description: error.message || 'Não foi possível salvar o tema.'
      });
    }
  };

  const handleDelete = async (theme: QuizTheme) => {
    if (!confirm(`Tem certeza que deseja excluir o tema "${theme.name}"? Esta ação não pode ser desfeita.`)) {
      return;
    }

    try {
      const { error } = await supabase
        .from('quiz_themes')
        .delete()
        .eq('id', theme.id);

      if (error) throw error;

      toast({
        title: 'Tema excluído',
        description: 'O tema foi excluído com sucesso.'
      });

      loadThemes();
      onThemeChange?.();
    } catch (error: any) {
      console.error('Error deleting theme:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir',
        description: error.message || 'Não foi possível excluir o tema. Verifique se não há questões associadas.'
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Carregando temas...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Create/Edit Form */}
      {(isCreating || editingTheme) && (
        <Card>
          <CardHeader>
            <CardTitle>{isCreating ? 'Novo Tema' : 'Editar Tema'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex: CSM - Certified ScrumMaster"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL) *</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="Ex: csm"
                />
                <p className="text-xs text-muted-foreground">Usado na URL: /slug</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descrição breve do tema"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtítulo (exibido na tela inicial)</Label>
              <Textarea
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                placeholder="Ex: Questões baseadas no exame oficial..."
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
              />
              <Label htmlFor="is_active">Tema ativo</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Theme List */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Temas Cadastrados</h2>
        {!isCreating && !editingTheme && (
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Tema
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {themes.map((theme) => (
          <Card key={theme.id} className={!theme.is_active ? 'opacity-60' : ''}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{theme.name}</h3>
                    {!theme.is_active && (
                      <span className="text-xs bg-muted px-2 py-1 rounded">Inativo</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">slug: {theme.slug}</p>
                  {theme.description && (
                    <p className="text-sm mt-1">{theme.description}</p>
                  )}
                  {theme.subtitle && (
                    <p className="text-xs text-muted-foreground mt-1 italic">"{theme.subtitle}"</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(theme)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(theme)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {themes.length === 0 && (
          <div className="text-center py-10 text-muted-foreground">
            Nenhum tema cadastrado.
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeManager;
