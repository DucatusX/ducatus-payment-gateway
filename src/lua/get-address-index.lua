local index = redis.call('RPOP', KEYS[1])
if not index then
	return redis.call('INCR', KEYS[2])
end
return index
