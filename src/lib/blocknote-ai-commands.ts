import { Block } from "@blocknote/core";
import { toast } from "sonner";

export async function handleDefineCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // Check if this is a preview with AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'define',
          selection: selectedText,
          context,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';
    let sentenceComplete = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content && !sentenceComplete) {
              aiText += content;
              // Check if we have a complete sentence
              const sentenceMatch = aiText.match(/^[^.!?]*[.!?]/);
              if (sentenceMatch) {
                sentenceComplete = true;
                aiText = sentenceMatch[0];
              }
              insertContent(aiText);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    toast.success('Definition added!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to get AI response');
  }
}

export async function handleExplainCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // Check if this is a preview with AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'explain',
          selection: selectedText,
          context,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              // Clean up brackets and quotes
              const cleanedContent = content.replace(/[\[\]"']/g, '');
              aiText += cleanedContent;
              insertContent(aiText);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    toast.success('Explanation added!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to get AI response');
  }
}

export async function handleSynonymCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // Check if this is a preview with AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'synonym',
          selection: selectedText,
          context,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';
    let sentenceComplete = false;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content && !sentenceComplete) {
              aiText += content;
              // Check if we have a complete sentence
              const sentenceMatch = aiText.match(/^[^.!?]*[.!?]/);
              if (sentenceMatch) {
                sentenceComplete = true;
                aiText = sentenceMatch[0];
              }
              insertContent(aiText);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    toast.success('Synonyms added!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to get AI response');
  }
}

export async function handleRephraseCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // Check if this is a preview with AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'rephrase',
          selection: selectedText,
          context,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiText += content;
              insertContent(aiText);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    toast.success('Text rephrased!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to get AI response');
  }
}

export async function handleGrammarCommand(
  selectedText: string,
  context: string,
  insertContent: (text: string) => void
): Promise<void> {
  // Check if this is a preview with AI limiting
  if ((window as any).__previewAICheck && !(window as any).__previewAICheck()) {
    return;
  }
  
  if (!selectedText.trim()) {
    toast.error('Please select some text first');
    return;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          command: 'grammar',
          selection: selectedText,
          context,
        }),
      }
    );

    if (!response.ok || !response.body) {
      throw new Error('Failed to get AI response');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let aiText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              aiText += content;
              insertContent(aiText);
            }
          } catch (e) {
            // Ignore parse errors
          }
        }
      }
    }

    toast.success('Grammar corrected!');
  } catch (error) {
    console.error('AI error:', error);
    toast.error('Failed to get AI response');
  }
}
