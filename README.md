# AI Agent with multiple Tools & Movie Search

A sophisticated AI Agent that combines multiple tools such as reddit search, image generation, movie search capabilities, and evaluation frameworks.

## Demo
https://github.com/user-attachments/assets/c2ea741f-e501-46b3-89f9-5e4370a70b80

## Generated Images and results 

![Image](https://github.com/user-attachments/assets/f5ac759c-2f2c-480b-8879-3feaa8a760a9)

```
├── src/
│ ├── ai/
│ │ ├── tools/ # AI tool implementations
│ │ ├── agent.ts # Main AI agent logic
│ │ ├── llm.ts # LLM integration (Gemini)
│ │ └── memory.ts # Conversation memory management
│ ├── evals/ # Evaluation framework
│ ├── rag/ # Movie search & retrieval
│ └── dashboard/ # Visualization interface

```

## Features

### 1. AI Tools Integration

- **Dad Jokes**: Fetches random dad jokes
- **Image Generation**: Creates images from text descriptions
- **Location Services**: Provides geographical coordinates
- **Weather Information**: Retrieves weather data
- **Reddit Integration**: Fetches Reddit content
- **Movie Search**: Searches movie information from IMDB dataset
- **Human In loop**: Ask for human permission to proceed further

### 2. RAG (Retrieval Augmented Generation)

- Movie database integration using IMDB dataset
- Vector search capabilities via Upstash
- Efficient movie information retrieval system

### 3. Evaluation Framework

- Tool performance measurement
- Automated testing of AI responses
- Scoring system for tool accuracy
- Multiple experiment configurations

### 4. Dashboard

- React-based visualization interface
- Experiment results display
- Performance metrics graphs
- Interactive data exploration

## Technical Stack

- **AI/LLM**: Google Gemini (via OpenAI-compatible API)
- **Vector Database**: Upstash
- **Frontend**: React + Vite
- **Backend**: Node.js + TypeScript
- **Data Storage**: JSON-based file storage
- **Testing**: Custom evaluation framework

## Key Components

### AI Tools

Each tool is modular and follows a consistent interface:

- Tool definition with Zod schema validation
- Standardized input/output handling
- Error management
- API integrations where needed

### RAG System

- IMDB movie dataset integration
- Vector embeddings for efficient search
- Query optimization for movie information retrieval

### Evaluation System

- Automated tool testing
- Performance metrics collection
- Experiment tracking
- Result visualization

### Dashboard

- Experiment results visualization
- Performance metrics display
- Interactive data exploration
- Real-time updates

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
GEMINI_API_KEY=your_key
GEO_CODE_API_KEY=your_key
# Add other required API keys
```

3. Start the application:

```bash
npm start
```

4. Run tests:

```bash
npm run test
```

5. Start dashboard:

```bash
cd dashboard
npm run dev
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
