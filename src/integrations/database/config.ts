// Move to src/integrations/database/config.ts
export const shardConfig = {
    shards: [
      { host: 'shard1.example.com', port: 5432 },
      { host: 'shard2.example.com', port: 5432 },
    ],
    shardKey: 'user_id',
  };
  
  export const readReplicas = [
    { host: 'replica1.example.com', port: 5432 },
    { host: 'replica2.example.com', port: 5432 },
  ];