package com.ssafy.dreamgream.domain.post.service;

import com.ssafy.dreamgream.domain.member.entity.Member;
import com.ssafy.dreamgream.domain.member.service.MemberService;
import com.ssafy.dreamgream.domain.post.entity.Post;
import com.ssafy.dreamgream.domain.post.repository.PostRepository;
import com.ssafy.dreamgream.global.common.exception.ErrorCode;
import com.ssafy.dreamgream.global.common.exception.customException.PostNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CelebrateService {
    private final PostRepository postRepository;
    private final MemberService memberService;
    private final RedisTemplate<String, String> redisTemplate;

    public void addCelebrate(Long postId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));

        Member member = memberService.getCurrentMember();

        String keyPost = "celebrate_post_" + postId;
        String keyMember = "celebrate_member_" + member.getMemberId();
        redisTemplate.opsForSet().add(keyPost, String.valueOf(member.getMemberId()));
        redisTemplate.opsForSet().add(keyMember, String.valueOf(postId));
    }

    public void removeCelebrate(Long postId) {
        Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostNotFoundException("PostNotFoundException", ErrorCode.POST_NOT_FOUND));

        Member member = memberService.getCurrentMember();

        String keyPost = "celebrate_post_" + postId;
        String keyMember = "celebrate_member_" + member.getMemberId();
        redisTemplate.opsForSet().remove(keyPost, String.valueOf(member.getMemberId()));
        redisTemplate.opsForSet().remove(keyMember, String.valueOf(postId));
    }
}
