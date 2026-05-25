import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { type, content } = await request.json();

    let prompt = '';

    switch (type) {
      case 'optimize-bio':
        prompt = `Improve this bio for a professional portfolio. Make it engaging, concise, and highlight key strengths:\n\n${content}`;
        break;
      case 'improve-project':
        prompt = `Rewrite this project description to be more professional and engaging for a portfolio:\n\n${content}`;
        break;
      case 'suggest-headline':
        prompt = `Based on this background, suggest 5 professional headlines for a portfolio:\n\n${content}`;
        break;
      case 'suggest-skills':
        prompt = `Based on this work experience, suggest relevant skills for a professional portfolio:\n\n${content}`;
        break;
      default:
        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    const message = await openai.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseContent = message.content[0];
    if (responseContent.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    return NextResponse.json({ result: responseContent.text });
  } catch (error) {
    console.error('AI API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate AI response' },
      { status: 500 }
    );
  }
}
